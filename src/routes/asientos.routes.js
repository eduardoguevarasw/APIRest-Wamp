import {Router} from 'express'
import{
    getAsientos,
} from '../controllers/asientosController.js'

const router = Router();

router.get('/asientos/:idRuta/:fecha', getAsientos );

export default router;