import { Router } from 'express';
import CandidateController from '../controllers/CandidateController';
import CandidateLoginController from '../controllers/CandidateLoginController';
import CorporateController from '../controllers/CorporateController';
import ProfileController from '../controllers/ProfileController';
import RecruiterController from '../controllers/RecruiterController';
import RecruiterLoginController from '../controllers/RecruiterLoginController';


const authMiddleware = require('../middleware/Auth')

const routes = Router();

const recruiterController = new RecruiterController
const candidateController = new CandidateController
const corporateController = new CorporateController
const recruiterLoginController = new RecruiterLoginController
const candidateLoginController = new CandidateLoginController
const profileController = new ProfileController

routes.post('/recruiter', recruiterController.create);
routes.delete('/recruiter/:id', recruiterController.delete);
routes.post('/corpdata', authMiddleware, corporateController.create);
routes.post('/candidate', candidateController.create);
routes.post('/candidateprofile', profileController.create);
routes.delete('/candidate/:id', candidateController.delete);


//auth
routes.post('/authrecruiter', recruiterLoginController.authenticate )
routes.post('/authcandidate', candidateLoginController .authenticate )




export default routes






