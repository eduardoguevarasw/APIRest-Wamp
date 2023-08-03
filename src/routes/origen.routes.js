import {Router} from 'express'
import {
    getOrigenes,
    getOrigenByNombre,
    createOrigen,
    updateOrigen,
    deleteOrigen,

} from '../controllers/origenesController.js'

const router = Router();


router.get('/origenes', getOrigenes );
router.get('/origenes/:id', getOrigenByNombre );
router.post('/origenes', createOrigen );
router.put('/origenes/:id', updateOrigen );
router.delete('/origenes/:id', deleteOrigen );


export default router;