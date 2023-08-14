import { Router } from "express";
import {getPDF,
 postticket} from "../controllers/pdfController.js"
const router = Router();

router.get("/pdf/:idRuta/:fecha", getPDF);
router.post("/ticket/:idRuta/:fecha", postticket);

export default router;