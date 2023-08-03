import {Router} from 'express'
import {
    getUsuarios,
    getUsuarioByUser,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} from '../controllers/usuariosController.js'


const router = Router();

router.get('/usuarios', getUsuarios );
router.get('/usuarios/:usuario', getUsuarioByUser );
router.post('/usuarios', createUsuario );
router.put('/usuarios/:usuario', updateUsuario );
router.delete('/usuarios/:usuario', deleteUsuario );


export default router;
