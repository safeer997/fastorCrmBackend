import { Router } from 'express';
import {
  createLead,
  getUnclaimedLeads,
  claimLead,
  getMyLeads,
} from '../controllers/lead.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/createlead', createLead);
router.get('/unclaimed', verifyToken, getUnclaimedLeads);
router.post('/claimlead/:id', verifyToken, claimLead);
router.get('/userleads', verifyToken, getMyLeads);

export default router;
