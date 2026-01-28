import { Router, Request, Response } from 'express';
import { db } from '../db';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Apply authentication to all routes
router.use(authenticate);

// GET all activities with user info
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const activities = await db('activities')
      .leftJoin('users', 'activities.userId', 'users.id')
      .select(
        'activities.*',
        'users.name as userName',
        'users.email as userEmail'
      )
      .orderBy('activities.createdAt', 'desc');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: error });
  }
});

// GET activity by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const activity = await db('activities')
      .leftJoin('users', 'activities.userId', 'users.id')
      .select(
        'activities.*',
        'users.name as userName',
        'users.email as userEmail'
      )
      .where('activities.id', req.params.id)
      .first();
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity', details: error });
  }
});

// POST create activity
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { type, description, date, contactId, dealId } = req.body;
    
    const [id] = await db('activities').insert({
      type,
      description,
      date,
      contactId,
      dealId,
      userId: req.user?.id, // Add the authenticated user's ID
    });
    
    // Fetch the created activity with user information
    const createdActivity = await db('activities')
      .leftJoin('users', 'activities.userId', 'users.id')
      .select(
        'activities.*',
        'users.name as userName',
        'users.email as userEmail'
      )
      .where('activities.id', id)
      .first();
    
    res.status(201).json(createdActivity);
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
