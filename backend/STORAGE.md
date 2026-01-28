# Image Upload Storage System

This document describes the image upload and storage system implemented in the CRM application.

## Overview

The system allows users to upload images (profile photos, etc.) which are stored on the server's file system and served statically via HTTP.

## Architecture

### Backend Components

#### 1. Storage Configuration (`src/middleware/upload.ts`)
- Uses **Multer** for handling multipart/form-data
- **Storage location**: `backend/uploads/` directory
- **Filename format**: `originalname-timestamp-random.ext`
- **Allowed formats**: JPEG, JPG, PNG, GIF, WebP
- **Max file size**: 5MB per file

#### 2. Upload Routes (`src/routes/upload.ts`)
Two main endpoints:

**Single Image Upload**
```
POST /api/upload/image
Content-Type: multipart/form-data
Body: file (field name)
```

Response:
```json
{
  "message": "File uploaded successfully",
  "file": {
    "filename": "photo-1706389200000-123456789.jpg",
    "originalName": "photo.jpg",
    "mimetype": "image/jpeg",
    "size": 245760,
    "url": "/uploads/photo-1706389200000-123456789.jpg"
  }
}
```

**Multiple Images Upload**
```
POST /api/upload/images
Content-Type: multipart/form-data
Body: files[] (array of files, max 10)
```

#### 3. Static File Serving
Uploaded files are served at: `http://localhost:3001/uploads/{filename}`

#### 4. Database Integration
- Contact photos stored as URLs in the `photo` field
- Can store either:
  - Server file URLs: `/uploads/filename.jpg`
  - Full URLs: `http://localhost:3001/uploads/filename.jpg`
  - Legacy base64 strings (backward compatible)

### Frontend Components

#### Upload Utility (`web/src/utils/fileHelpers.ts`)

**New Method: `uploadImage()`**
```typescript
uploadImage(
  file: File,
  onSuccess: (fileUrl: string) => void,
  onError: (message: string) => void,
  maxSizeMB?: number
)
```

Example usage:
```typescript
import { uploadImage } from '../utils/fileHelpers';

const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  uploadImage(
    file,
    (fileUrl) => {
      console.log('Uploaded:', fileUrl);
      // Update contact with photo: fileUrl
    },
    (error) => {
      console.error('Upload failed:', error);
    },
    5 // Max 5MB
  );
};
```

**Legacy Method: `handleImageUpload()`**
Still available for base64 encoding (backward compatibility).

## Security Considerations

1. **File Type Validation**: Only image files accepted (MIME type check)
2. **Size Limits**: 5MB maximum per file
3. **Filename Sanitization**: Generated unique filenames prevent conflicts
4. **Storage Location**: Files stored outside public web root
5. **CORS Configuration**: Only configured origins can upload

## Git Configuration

The `uploads/` directory is excluded from version control:
- `.gitignore` excludes all uploaded files
- `.gitkeep` file ensures the directory structure exists

## Migration Path

For existing base64-encoded photos in the database:

1. Photos can remain as base64 strings (backward compatible)
2. New uploads will use the file storage system
3. Optional: Create migration script to convert base64 to files

## API Examples

### Upload and Create Contact
```typescript
// 1. Upload photo
const response = await fetch('http://localhost:3001/api/upload/image', {
  method: 'POST',
  body: formData, // FormData with 'file' field
});
const { file } = await response.json();

// 2. Create contact with photo URL
await fetch('http://localhost:3001/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    photo: file.url, // Use the uploaded file URL
  }),
});
```

### Update Contact Photo
```typescript
// Same two-step process: upload first, then update
uploadImage(file, async (fileUrl) => {
  await fetch(`http://localhost:3001/api/contacts/${contactId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ photo: fileUrl }),
  });
});
```

## Deployment Considerations

### Development
- Files stored locally in `backend/uploads/`
- Served from Express static middleware

### Production
Consider:
1. **Cloud Storage**: AWS S3, Google Cloud Storage, Azure Blob Storage
2. **CDN**: CloudFront, Cloudflare for faster delivery
3. **Image Processing**: Sharp library for resizing/optimization
4. **Separate Domain**: `uploads.yourapp.com` for better caching

## Future Enhancements

- [ ] Image resizing/optimization on upload
- [ ] Thumbnail generation
- [ ] Cloud storage integration (S3, etc.)
- [ ] Progress indicators for large uploads
- [ ] Drag-and-drop upload UI
- [ ] Image cropping before upload
- [ ] Support for other file types (PDF, documents)
