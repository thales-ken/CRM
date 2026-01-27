export const handleImageUpload = (
  file: File,
  onSuccess: (base64: string) => void,
  onError: (message: string) => void,
  maxSizeMB: number = 2
): void => {
  if (file.size > maxSizeMB * 1024 * 1024) {
    onError(`Photo size must be less than ${maxSizeMB}MB`);
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    onSuccess(reader.result as string);
  };
  reader.onerror = () => {
    onError('Failed to read file');
  };
  reader.readAsDataURL(file);
};
