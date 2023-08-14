import {Router } from 'express'
import {
    getdestinos,
    getDestinoByNombre,
    createDestino,
    updateDestino,
    deleteDestino,
    getDestinoByOrigen
} from '../controllers/destinosController.js'


const router = Router();

router.get('/destinos', getdestinos );
router.get('/destinos/:nombre', getDestinoByNombre );
router.post('/destinos', createDestino );
router.put('/destinos/:id', updateDestino );
router.delete('/destinos/:id', deleteDestino );
router.get('/destinos/origen/:origen', getDestinoByOrigen );

export default router;