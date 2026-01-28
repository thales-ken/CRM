import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// GET all contacts
router.get('/', async (req: Request, res: Response) => {
  try {
    const contacts = await db('contacts').select('*');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: error });
  }
});

// GET contact by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const contact = await db('contacts').where('id', req.params.id).first();
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact', details: error });
  }
});

// POST create contact
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, status, photo } = req.body;
    const [id] = await db('contacts').insert({
      name,
      email,
      phone,
      company,
      status: status || 'prospect',
      photo: photo || null,
    });
    res.status(201).json({ id, message: 'Contact created' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact', details: error });
  }
});

// PUT update contact
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, status, photo } = req.body;
    const updateData: any = {
      name,
      email,
      phone,
      company,
      status,
      updatedAt: new Date(),
    };
    
    // Only update photo if provided (to avoid overwriting with undefined)
    if (photo !== undefined) {
      updateData.photo = photo;
    }
    
    await db('contacts').where('id', req.params.id).update(updateData);
    res.json({ message: 'Contact updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact', details: error });
  }
});

// DELETE contact
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await db('contacts').where('id', req.params.id).del();
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact', details: error });
  }
});

export default router;
