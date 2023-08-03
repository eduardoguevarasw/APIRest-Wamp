import {Router} from 'express'
import {
    getPasajeros,
    getPasajeroByCedula,
    createPasajero,
    updatePasajero,
    deletePasajero,
} from '../controllers/pasajerosController.js'

const router = Router();

router.get('/pasajeros', getPasajeros );
router.get('/pasajeros/:cedula', getPasajeroByCedula );
router.post('/pasajeros', createPasajero );
router.put('/pasajeros/:cedula', updatePasajero );
router.delete('/pasajeros/:cedula', deletePasajero );

export default router;