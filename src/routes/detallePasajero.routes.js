import { Router } from "express";
import {
    detallePasajero,
} from "../controllers/detallePasajeroController.js";

const router = Router();

router.post("/detalle/:idRuta/:fecha", detallePasajero);

export default router;