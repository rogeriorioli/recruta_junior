import { Router } from 'express';
import multer from 'multer';
import CandidateController from '../controllers/CandidateController';
import CandidateLoginController from '../controllers/CandidateLoginController';
import CorporateController from '../controllers/CorporateController';
import JobController from '../controllers/JobController';
import ProfileController from '../controllers/ProfileController';
import RecruiterController from '../controllers/RecruiterController';
import RecruiterLoginController from '../controllers/RecruiterLoginController';
import ResumeController from '../controllers/ResumeController';
import multerConfig = require('../config/multer.config')
import AvatarController from '../controllers/AvatarController';
import LogoController from '../controllers/LogoController';

const authMiddleware = require('../middleware/Auth')

const routes = Router();

const recruiterController = new RecruiterController
const candidateController = new CandidateController
const corporateController = new CorporateController
const recruiterLoginController = new RecruiterLoginController
const candidateLoginController = new CandidateLoginController
const profileController = new ProfileController
const jobcontroller = new JobController
const resumeController = new ResumeController
const avatarController = new AvatarController
const logoController = new LogoController

//post
routes.post('/recruiter', recruiterController.create);
routes.post('/corpdata', authMiddleware, corporateController.create);
routes.post('/candidate', candidateController.create);
routes.post('/candidateprofile', profileController.create);
routes.post('/job', jobcontroller.create);
routes.post('/resume', resumeController.create);

//update


//delete
routes.delete('/recruiter/:id', recruiterController.delete);
routes.delete('/candidate/:id', candidateController.delete);


//auth
routes.post('/authrecruiter', recruiterLoginController.authenticate )
routes.post('/authcandidate', candidateLoginController .authenticate )

const avatar = multer(multerConfig)

routes.post('/user_avatar', avatar.single('avatar_url'), avatarController.create)

routes.post('/corp_logo', avatar.single('logo_url'), logoController.create)


export default routes






