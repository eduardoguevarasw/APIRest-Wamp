import {pool} from '../db.js'

const getdestinos = async (req, res) => {
    try {
        const result = await pool.query(
            //hacer un inner join con origen para traer el nombre del origen
            "SELECT d.nombre AS nombre, d.valor AS precio, o.nombre AS origen FROM destino d INNER JOIN origen o ON d.idOrigen = o.idOrigen"
        )
        res.json(result[0]);
    } catch (e) {
        console.log(e);
    }
}

const getDestinoByNombre = async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const result = await pool.query(
            'SELECT * FROM destino WHERE nombre = ?',
            [nombre]
        )
        res.json(result[0]);
    } catch (e) {
        console.log(e);
    }
}

const createDestino = async (req, res) => {
    const {
        nombre,
        valor,
        idOrigen
    } = req.body;
    try { 
        const result = await pool.query(
            'INSERT INTO destino (nombre, valor, idOrigen) VALUES (?, ?, ?)',
            [nombre, valor, idOrigen]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Destino creado',
                body: {
                    destino: { nombre, valor, idOrigen },
                }
            })
        }else{
            return res.json({
                message: 'No se pudo crear el destino',
                body: {
                    destino: { nombre, valor, idOrigen },
                }
            })
        }
    }catch (e) {console.log(e);}
}

const updateDestino = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, valor, idOrigen } = req.body;
        const result = await pool.query(
            'UPDATE destino SET nombre = ?, valor = ?, idOrigen = ? WHERE idDestino = ?',
            [nombre, valor, idOrigen, id]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Destino actualizado',
                body: {
                    destino: { nombre, valor, idOrigen },
                }
            })
        }else{
            return res.json({
                message: 'No se pudo actualizar el destino',
                body: {
                    destino: { nombre, valor, idOrigen },
                }
            })
        }
    } catch (e) {console.log(e);}
}

const deleteDestino = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            'DELETE FROM destino WHERE idDestino = ?',
            [id]
        )
        if (result[0].affectedRows > 0) {
            return res.json({
                message: 'Destino eliminado',
                body: {
                    destino: { id },
                }
            })
        }else{
            return res.json({
                message: 'No se pudo eliminar el destino',
                body: {
                    destino: { id },
                }
            })
        }
    } catch (e) {console.log(e);}
}

const getDestinoByOrigen = async (req, res) => {
    try {
        const origen = req.params.origen;
        const result = await pool.query(
            //hacer un inner join con origen para traer el nombre del origen
            "SELECT d.nombre AS nombre, d.valor AS precio, o.nombre AS origen FROM destino d INNER JOIN origen o ON d.idOrigen = o.idOrigen WHERE o.nombre = ?",
            [origen]
        )
        res.json(result[0]);
    } catch (e) {
        console.log(e);
    }
}


export {getdestinos, getDestinoByNombre, createDestino, updateDestino, deleteDestino, getDestinoByOrigen}