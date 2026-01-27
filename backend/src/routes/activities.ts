import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await db('activities').select('*');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: error });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await db('activities').where('id', req.params.id).first();
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity', details: error });
  }
});

// POST create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { type, description, date, contactId, dealId } = req.body;
    const [id] = await db('activities').insert({
      type,
      description,
      date,
      contactId,
      dealId,
    });
    res.status(201).json({ id, message: 'Activity created' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity', details: error });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { type, description, date, contactId, dealId } = req.body;
    await db('activities').where('id', req.params.id).update({
      type,
      description,
      date,
      contactId,
      dealId,
      updatedAt: new Date(),
    });
    res.json({ message: 'Activity updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity', details: error });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await db('activities').where('id', req.params.id).del();
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity', details: error });
  }
});

export default router;
