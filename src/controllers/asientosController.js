import {pool} from '../db.js'

const getAsientos = async (req, res) => {
    try{
        //obtener el idViaje del idRuta 
        const idRuta = req.params.idRuta;
        const fecha = req.params.fecha;
        //obtener el idViaje con el idRuta
        const result = await pool.query(
            'SELECT * FROM `viaje` WHERE fecha = ? AND idRuta = ?',
            [fecha, idRuta]
        );
        const idViaje = result[0][0].idViaje;
        //obtener los asientos con el idViaje
        const result2 = await pool.query(
            'SELECT asiento FROM `detallePasajero` WHERE idViaje = ?',
            [idViaje]
        )
        return res.status(200).json(result2[0]);
    }catch(e){
        return res.status(404).json({
            message: "No se pudo obtener los asientos"
        }).end();
    }
}

export {
    getAsientos
}