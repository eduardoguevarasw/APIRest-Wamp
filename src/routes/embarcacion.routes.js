import {Router} from 'express'
import {
    getEmbarcaciones,
    getEmbarcacionById,
    createEmbarcacion,
    updateEmbarcacion,
    deleteEmbarcacion,
} from '../controllers/embarcacionesController.js'

const router = Router();

router.get('/embarcaciones', getEmbarcaciones );
router.get('/embarcaciones/:nombre', getEmbarcacionById );
router.post('/embarcaciones', createEmbarcacion );
router.put('/embarcaciones/:id', updateEmbarcacion );
router.delete('/embarcaciones/:id', deleteEmbarcacion );

export default router;