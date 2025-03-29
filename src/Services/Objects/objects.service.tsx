import api from "../api/api";
import { OBJECTS_API_ROUTES } from "../api/routes";
import { GetObjectsResponse } from "./objects.types";

class ObjectsService {
  async GetObjects(
    bucketId: string,
    prefix: string
  ): Promise<GetObjectsResponse> {
    const response = await api.post(OBJECTS_API_ROUTES.FILTER_OBJECTS, {
      bucketId,
      prefix,
    });

    return response.data;
  }
}

const objectsServiceInstance = new ObjectsService();
export default objectsServiceInstance;
