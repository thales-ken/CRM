/**
 * Upload an image file to the server
 * @param file - The file to upload
 * @param onSuccess - Callback function with the file URL when successful
 * @param onError - Callback function with error message when failed
 * @param maxSizeMB - Maximum file size in MB (default: 5MB)
 */
export const uploadImage = async (
  file: File,
  onSuccess: (fileUrl: string) => void,
  onError: (message: string) => void,
  maxSizeMB: number = 5
): Promise<void> => {
  if (file.size > maxSizeMB * 1024 * 1024) {
    onError(`Photo size must be less than ${maxSizeMB}MB`);
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3001/api/upload/image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    const data = await response.json();
    // Return the full URL for the uploaded file
    onSuccess(`http://localhost:3001${data.file.url}`);
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Failed to upload file');
  }
};

/**
 * Legacy function for base64 encoding (kept for backward compatibility)
 * Consider using uploadImage() instead for better performance
 */
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
