import axios from "axios";
import api from "../api/api";
import { MUNITS_HUB_ROUTES } from "../api/routes";
import { GetObjectsResponse } from "./objects.types";

class ObjectsService {
  async GetObjects(
    bucketId: string,
    prefix: string
  ): Promise<GetObjectsResponse> {
    const response = await api.post(MUNITS_HUB_ROUTES.FILTER_OBJECTS, {
      bucketId,
      prefix,
    });

    return response.data;
  }

  async InitiateUpload(
    bucketId: string,
    fileKey: string,
    sizeInBytes: number,
    mimeType: string
  ): Promise<{ uploadId: string }> {
    const response = await api.post(MUNITS_HUB_ROUTES.INITIATE_UPLOAD, {
      bucketId,
      fileKey,
      sizeInBytes,
      contentType: mimeType,
    });

    return response.data;
  }

  async UploadPart(
    bucketId: string,
    fileKey: string,
    sizeInBytes: number,
    mimeType: string
  ): Promise<{ uploadId: string }> {
    const response = await api.post(MUNITS_HUB_ROUTES.INITIATE_UPLOAD, {
      bucketId,
      fileKey,
      sizeInBytes,
      contentType: mimeType,
    });

    return response.data;
  }

  async GetUploadSignedUrls(
    uploadId: string,
    bucketId: string,
    sizeInBytes: number
  ): Promise<{ urls: string[] }> {
    const response = await api.get(
      MUNITS_HUB_ROUTES.GET_UPLOAD_SIGNED_URLS(uploadId, bucketId, sizeInBytes)
    );

    return response.data;
  }

  async CompleteUpload(
    uploadId: string,
    bucketId: string,
    ETags: Record<number, string>
  ) {
    await api.post(MUNITS_HUB_ROUTES.COMPLETE_UPLOAD(uploadId), {
      bucketId,
      ETags,
    });
  }

  async AbortUpload(uploadId: string, bucketId: string) {
    await api.post(MUNITS_HUB_ROUTES.ABORT_UPLOAD(uploadId), {
      bucketId,
    });
  }

  async uploadFilePartsToSignedUrls(
    file: File,
    urls: string[]
  ): Promise<Record<number, string>> {
    const CHUNK_SIZE = 5 * 1024 * 1024;
    const etags: Record<number, string> = {};

    for (let i = 0; i < urls.length; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("file", chunk, file.name);

      try {
        const res = await axios.put(urls[i], formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const etag = res.data?.etag;
        if (etag) {
          etags[i + 1] = etag;
        } else {
          throw new Error(`Missing ETag in response body for part ${i + 1}`);
        }
      } catch (error) {
        throw new Error(`Failed to upload part ${i + 1}: ${error}`);
      }
    }

    return etags;
  }
}

const objectsServiceInstance = new ObjectsService();
export default objectsServiceInstance;
