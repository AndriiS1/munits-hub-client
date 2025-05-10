import axios from "axios";
import objectsServiceInstance from "../Objects/objects.api.service";
import type { InitiateUploadResponse } from "../Objects/objects.types";

class StorageService {
  async UploadFile(
    bucketId: string,
    uploadPathPrefix: string,
    file: File,
    onRefresh?: () => void
  ) {
    let initiateUploadData: InitiateUploadResponse | undefined = undefined;

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

      if (onRefresh) {
        onRefresh();
      }

      console.log("Upload completed successfully.");
    } catch (error) {
      console.error("Upload failed", error);
      if (initiateUploadData) {
        await objectsServiceInstance.AbortUpload(
          bucketId,
          initiateUploadData.objectId,
          initiateUploadData.uploadId
        );
      }
    }
  }

  async uploadFilePartsToSignedUrls(
    file: File,
    urls: string[]
  ): Promise<{ ETags: Record<number, string> }> {
    const CHUNK_SIZE = 5 * 1024 * 1024;
    const etags: Record<number, string> = {};

    const uploadPromises = urls.map(async (url, i) => {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("file", chunk, file.name);

      try {
        const res = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const etag = (res.data as { eTag: string }).eTag;

        if (!etag) throw new Error(`Missing ETag for part ${i + 1}`);

        etags[i + 1] = etag;
      } catch (err) {
        throw new Error(`Failed to upload part ${i + 1}: ${err}`);
      }
    });

    await Promise.all(uploadPromises);

    return { ETags: etags };
  }
}

const storageServiceInstance = new StorageService();
export default storageServiceInstance;
