import api from "../api/api";
import { MUNITS_HUB_ROUTES } from "../api/routes";
import type {
  GetObjectResponse,
  GetObjectsResponse,
  InitiateUploadResponse,
  ObjectSuffixesCursor,
} from "./objects.types";

class ObjectsService {
  async GetObjectSuffixes(
    bucketId: string,
    prefix: string,
    cursor?: ObjectSuffixesCursor,
    pageSize: number = 5
  ): Promise<GetObjectsResponse> {
    const response = await api.post(
      MUNITS_HUB_ROUTES.FILTER_OBJECTS(bucketId),
      {
        prefix,
        pageSize,
        cursor,
      }
    );

    return response.data as GetObjectsResponse;
  }

  async InitiateUpload(
    bucketId: string,
    fileKey: string,
    sizeInBytes: number,
    mimeType: string
  ): Promise<InitiateUploadResponse> {
    const response = await api.post(
      MUNITS_HUB_ROUTES.INITIATE_UPLOAD(bucketId),
      {
        fileKey,
        sizeInBytes,
        contentType: mimeType,
      }
    );

    return response.data as InitiateUploadResponse;
  }

  async GetUploadSignedUrls(
    bucketId: string,
    objectId: string,
    uploadId: string,
    sizeInBytes: number
  ): Promise<{ urls: string[] }> {
    const response = await api.get(
      MUNITS_HUB_ROUTES.GET_UPLOAD_SIGNED_URLS(
        bucketId,
        objectId,
        uploadId,
        sizeInBytes
      )
    );

    return response.data as { urls: string[] };
  }

  async GetObject(
    bucketName: string,
    objectId: string
  ): Promise<GetObjectResponse> {
    const response = await api.get(
      MUNITS_HUB_ROUTES.GET_OBJECT(bucketName, objectId)
    );

    return response.data as GetObjectResponse;
  }

  async CompleteUpload(
    bucketId: string,
    objectId: string,
    uploadId: string,
    ETags: Record<number, string>
  ) {
    await api.post(
      MUNITS_HUB_ROUTES.COMPLETE_UPLOAD(bucketId, objectId, uploadId),
      {
        ETags,
      }
    );
  }

  async Delete(bucketId: string, fileKey: string, uploadId?: string) {
    await api.delete(MUNITS_HUB_ROUTES.DELETE(bucketId, fileKey, uploadId));
  }

  async AbortUpload(bucketId: string, objectId: string, uploadId: string) {
    await api.post(
      MUNITS_HUB_ROUTES.ABORT_UPLOAD(bucketId, objectId, uploadId)
    );
  }
}

const objectsServiceInstance = new ObjectsService();
export default objectsServiceInstance;
