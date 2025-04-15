import axios from "axios";
import objectsServiceInstance from "../Objects/objects.api.service";
import { InitiateUploadResponse } from "../Objects/objects.types";

class StorageService {
  async UploadFile(bucketId: string, uploadPathPrefix: string, file: File) {
    let initiateUploadData: InitiateUploadResponse;

    const fileKey = `${uploadPathPrefix}/${file.name}`;
    try {
      console.log("Uploading file:", file.name, file.size, file.type);

      console.log("Initiating upload.");
      initiateUploadData = await objectsServiceInstance.InitiateUpload(
        bucketId,
        fileKey,
        file.size,
        file.type
      );

      console.log("Upload data.", initiateUploadData);

      console.log("Getting signed URLs.");
      const { urls } = await objectsServiceInstance.GetUploadSignedUrls(
        bucketId,
        initiateUploadData.objectId,
        initiateUploadData.uploadId,
        file.size
      );
      console.log("URLs.", urls);

      console.log("Upload file parts by 5 mb.", urls);
      const { ETags } = await this.uploadFilePartsToSignedUrls(file, urls);
      console.log("ETags.", ETags);

      await objectsServiceInstance.CompleteUpload(
        bucketId,
        initiateUploadData.objectId,
        initiateUploadData.uploadId,
        ETags
      );

      console.log("Upload completed successfully.");
    } catch (error) {
      console.error("Upload failed", error);
      // if (uploadId) {
      //   await objectsServiceInstance.AbortUpload(uploadId, bucketId);
      // }
    }
  }

  async uploadFilePartsToSignedUrls(
    file: File,
    urls: string[]
  ): Promise<{ ETags: Record<number, string> }> {
    const CHUNK_SIZE = 5 * 1024 * 1024;
    const etags: Record<number, string> = {};

    for (let i = 0; i < urls.length; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("file", chunk, file.name);

      try {
        console.log("Uploading part.");
        const res = await axios.put(urls[i], formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const etag = res.data?.eTag;
        console.log("part upload response.", res.data);

        if (etag) {
          etags[i + 1] = etag;
        } else {
          throw new Error(`Missing ETag in response body for part ${i + 1}`);
        }
      } catch (error) {
        throw new Error(`Failed to upload part ${i + 1}: ${error}`);
      }
    }

    return {
      ETags: etags,
    };
  }
}

const storageServiceInstance = new StorageService();
export default storageServiceInstance;
