import {pool} from '../db.js'

const getEmbarcaciones = async (req, res) => {
    try {
        const result = await pool.query(
            //traer el nombre de la cooperativa en un inner join 
            "SELECT e.idEmbarcacion, e.nombre, e.capacidad, c.nombre AS cooperativa FROM embarcacion e INNER JOIN cooperativa c ON e.idCoop = c.idCoop"
        )
        res.json(result[0]);
    } catch (e) {
        console.log(e);
    }
}

const getEmbarcacionById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            'SELECT * FROM embarcacion WHERE idEmbarcacion = ?',
            [id]
        )
        res.json(result[0]);
    } catch (e) {
        console.log(e);
    }
}

const createEmbarcacion = async (req, res) => {
    const {
        nombre,
        capacidad,
        idCoop
    } = req.body;
    try { 
        const result = await pool.query(
            'INSERT INTO embarcacion (nombre, capacidad, idCoop) VALUES (?, ?, ?)',
            [nombre, capacidad, idCoop]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Embarcacion creada',
                body: {
                    embarcacion: { nombre, capacidad, idCoop },
                }
            })
        }else{
            return res.json({
                message: 'No se pudo crear la embarcacion',
                body: {
                    embarcacion: { nombre, capacidad, idCoop },
                }
            })
        }
    }catch (e) {console.log(e);}
}

const updateEmbarcacion = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, capacidad, idCoop } = req.body;
        const result = await pool.query(
            'UPDATE embarcacion SET nombre = ?, capacidad = ?, idCoop = ? WHERE idEmbarcacion = ?',
            [nombre, capacidad, idCoop, id]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Embarcacion actualizada',
                body: {
                    embarcacion: { nombre, capacidad, idCoop },
                }
            })
        }else{
            return res.json({
                message: 'No se pudo actualizar la embarcacion',
                body: {
                    embarcacion: { nombre, capacidad, idCoop },
                }
            })
        }
    } catch (e) {console.log(e);}
}

const deleteEmbarcacion = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            'DELETE FROM embarcacion WHERE idEmbarcacion = ?',
            [id]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Embarcacion eliminada',
                body: {
                    embarcacion: { id },
                }
            })
        }else{
            return res.json({
                message: 'No se pudo eliminar la embarcacion',
                body: {
                    embarcacion: { id },
                }
            })
        }
    } catch (e) {console.log(e);}
}

export {getEmbarcaciones, getEmbarcacionById, createEmbarcacion, updateEmbarcacion, deleteEmbarcacion}