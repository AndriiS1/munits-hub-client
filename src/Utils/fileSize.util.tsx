export const nameTruncateLength = 25;
export const typeTruncateLength = 20;

export function GetSizeString(sizeInBytes: number): string {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (sizeInBytes >= 1024 && i < sizes.length - 1) {
    sizeInBytes /= 1024;
    i++;
  }
  return `${Math.round(sizeInBytes * 100) / 100} ${sizes[i]}`;
}

export function GetFileUploadPathWithPrefix(
  prefix: string,
  path: string
): string {
  return `${prefix}/${path}`;
}

export function TruncateContentType(contentType: string): string {
  if (contentType.length > typeTruncateLength) {
    return (
      contentType.substring(0, typeTruncateLength) +
      "..." +
      contentType.substring(contentType.length - 5, contentType.length)
    );
  }

  return contentType;
}

export function TruncateFileName(fileName: string): string {
  if (fileName.length > nameTruncateLength) {
    return (
      fileName.substring(0, nameTruncateLength) +
      "..." +
      fileName.substring(fileName.length - 5, fileName.length)
    );
  }

  return fileName;
}
