import express from 'express';
import {PORT} from './config.js';
import usuariosRoutes from './routes/usuarios.routes.js'
import pingRoutes from './routes/index.routes.js'
import pasajerosRoutes from './routes/pasajeros.routes.js'
import origenRoutes from './routes/origen.routes.js'
import embarcacionRoutes from './routes/embarcacion.routes.js'  
import destinosRoutes from './routes/destinos.routes.js'
import rutasRoutes from './routes/rutas.routes.js'
import loginRoutes from './routes/login.routes.js'
import asientosRoutes from './routes/asientos.routes.js'
import detalleRoutes from './routes/detallePasajero.routes.js'
import pdf from './routes/ticketPDF.routes.js'
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use(usuariosRoutes)
app.use(pingRoutes)
app.use(pasajerosRoutes)
app.use(origenRoutes)
app.use(embarcacionRoutes)
app.use(destinosRoutes)
app.use(rutasRoutes)
app.use(loginRoutes)
app.use(asientosRoutes)
app.use(detalleRoutes)
app.use(pdf)


app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});