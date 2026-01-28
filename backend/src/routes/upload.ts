import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload';

const router = Router();

// POST upload single image
router.post('/image', upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the file information
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file', details: error });
  }
});

// POST upload multiple images
router.post('/images', upload.array('files', 10), (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const filesInfo = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
    }));

    res.json({
      message: 'Files uploaded successfully',
      files: filesInfo,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload files', details: error });
  }
});

export default router;
