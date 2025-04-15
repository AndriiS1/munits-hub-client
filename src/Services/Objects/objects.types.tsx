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
  nextCursor?: ObjectSuffixesCursor[];
  hasNext: boolean;
}

export interface InitiateUploadResponse {
  objectId: string;
  uploadId: string;
}
