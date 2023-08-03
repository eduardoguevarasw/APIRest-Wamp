import {pool} from '../db.js'

const getOrigenes = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM origen',
        )
        res.json(result[0]);
    } catch (e) {
        console.log(e);
    }
}

const getOrigenByNombre = async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const result = await pool.query(
            'SELECT * FROM origen WHERE nombre = ?',
            [nombre]
        )
        res.json(result[0]);
    } catch (e) {
        console.log(e);
    }
}

const createOrigen = async (req, res) => {
    try {
        const { nombre } = req.body;
        const result = await pool.query(
            'INSERT INTO origen (nombre) VALUES (?)',
            [nombre]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Origen creado',
                body: {
                    origen: { nombre },
                }
            })
        } else {
            return res.json({
                message: 'No se pudo crear el origen',
                body: {
                    origen: { nombre },
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}

const updateOrigen = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre } = req.body;
        const result = await pool.query(
            'UPDATE origen SET nombre = ? WHERE id = ?',
            [nombre, id]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Origen actualizado',
                body: {
                    origen: { nombre },
                }
            })
        } else {
            return res.json({
                message: 'No se pudo actualizar el origen',
                body: {
                    origen: { nombre },
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}

const deleteOrigen = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            'DELETE FROM origen WHERE id = ?',
            [id]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Origen eliminado',
                body: {
                    origen: { id },
                }
            })
        } else {
            return res.json({
                message: 'No se pudo eliminar el origen',
                body: {
                    origen: { id },
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}

export {
    getOrigenes,
    getOrigenByNombre,
    createOrigen,
    updateOrigen,
    deleteOrigen
}

