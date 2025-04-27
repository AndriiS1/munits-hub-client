export interface ObjectSuffixResponse {
  id: string;
  suffix: string;
  createdAt: string;
  type: "Object" | "Directory";
  mimeType: string;
}

export interface ObjectSuffixesCursor {
  type?: string;
  suffix?: string;
}

export interface GetObjectsResponse {
  objectSuffixes: ObjectSuffixResponse[];
  nextCursor?: ObjectSuffixesCursor;
  hasNext: boolean;
}

export interface InitiateUploadResponse {
  objectId: string;
  uploadId: string;
}

export interface ObjectResponse {
  uploadId: string;
  uploadStatus: string;
  customMetadata: Record<string, string>;
  initiatedAt: Date;
  sizeInBytes: number;
  mimeType: string;
  tags: Record<string, string>;
}

export interface GetObjectResponse {
  id: string;
  bucketId: string;
  fileKey: string;
  createdAt: Date;
  versions: ObjectResponse[];
}
