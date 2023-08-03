import {Router} from 'express';
import {
    getRutas,
    getRutaById,
    createRuta,
    updateRuta,
    deleteRuta,
} from '../controllers/rutasController.js';


const router = Router();

router.get('/rutas', getRutas);
router.get('/rutas/:id', getRutaById);
router.post('/rutas', createRuta);
router.put('/rutas/:id', updateRuta);
router.delete('/rutas/:id', deleteRuta);


export default router;