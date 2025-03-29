export interface ObjectResponse {
  id: string;
  fileName: string;
  uploadedAt: boolean;
}

export interface FolderResponse {
  id: string;
  prefix: string;
}

export interface GetObjectsResponse {
  objects: ObjectResponse[];
  folders: FolderResponse[];
}
