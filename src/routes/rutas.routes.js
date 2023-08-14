import {Router} from 'express';
import {
    getRutas,
    getRutaById,
    getRutaById2,
    getRutaByOrigenDestino,
    createRuta,
    updateRuta,
    deleteRuta,

} from '../controllers/rutasController.js';


const router = Router();

router.get('/rutas/:cooperativa', getRutas);
router.get('/rutas/:id/:fecha', getRutaById);
router.get('/rutasid/:id', getRutaById2);
router.get('/rutas/:origen/:destino/:cooperativa/:dia', getRutaByOrigenDestino);
router.post('/rutas', createRuta);
router.put('/rutas/:id', updateRuta);
router.delete('/rutas/:id', deleteRuta);



export default router;