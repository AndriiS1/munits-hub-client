import api from "../api/api";
import { MUNITS_HUB_ROUTES } from "../api/routes";
import { GetObjectsResponse, ObjectSuffixesCursor } from "./objects.types";

class ObjectsService {
  async GetObjectSuffixes(
    bucketId: string,
    prefix: string,
    cursor?: ObjectSuffixesCursor,
    pageSize: number = 20
  ): Promise<GetObjectsResponse> {
    const response = await api.post(MUNITS_HUB_ROUTES.FILTER_OBJECTS, {
      bucketId,
      prefix,
      pageSize,
      cursor,
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
}

const objectsServiceInstance = new ObjectsService();
export default objectsServiceInstance;
