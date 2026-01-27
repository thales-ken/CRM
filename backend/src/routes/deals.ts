import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// GET all deals
router.get('/', async (req: Request, res: Response) => {
  try {
    const deals = await db('deals').select('*');
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deals', details: error });
  }
});

// GET deal by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const deal = await db('deals').where('id', req.params.id).first();
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deal', details: error });
  }
});

// POST create deal
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, company, value, stage, probability, closeDate, owner } = req.body;
    const [id] = await db('deals').insert({
      title,
      company,
      value,
      stage: stage || 'negotiation',
      probability: probability || 0,
      closeDate,
      owner,
    });
    res.status(201).json({ id, message: 'Deal created' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create deal', details: error });
  }
});

// PUT update deal
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, company, value, stage, probability, closeDate, owner } = req.body;
    await db('deals').where('id', req.params.id).update({
      title,
      company,
      value,
      stage,
      probability,
      closeDate,
      owner,
      updatedAt: new Date(),
    });
    res.json({ message: 'Deal updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update deal', details: error });
  }
});

// DELETE deal
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await db('deals').where('id', req.params.id).del();
    res.json({ message: 'Deal deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete deal', details: error });
  }
});

export default router;
