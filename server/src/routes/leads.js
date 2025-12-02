import { Router } from 'express';
import { createLeadRules } from '../validators/leadValidators.js';
import { createLead, getAllLeads} from '../controllers/leadController.js';

export const leadRouter = Router();

leadRouter.post('/', createLeadRules, createLead);
leadRouter.get('/', getAllLeads);
