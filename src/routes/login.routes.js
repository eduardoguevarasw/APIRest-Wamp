import {Router} from 'express'
import {
    getUser
} from '../controllers/loginController.js'

const router = Router();

router.get('/login/:usuario/:password', getUser );

export default router;