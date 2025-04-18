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
  if (contentType.length > 20) {
    return (
      contentType.substring(0, 20) +
      "..." +
      contentType.substring(contentType.length - 5, contentType.length)
    );
  }

  return contentType;
}
