import { pool } from "../db.js";

const getPasajeros = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pasajeros");
    res.json(result[0]);
  } catch (e) {
    console.log(e);
  }
};

const getPasajeroByCedula = async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const result = await pool.query(
      "SELECT * FROM pasajeros WHERE documento = ?",
      [cedula]
    );
    if(result[0].length > 0){
        return res.json(result[0]);
    }else{
      return res.json({
        message: "No se encontro el pasajero",
      });
    }
  } catch (e) {
    return res.json({
      message: "No se pudo obtener el pasajero",
    });
  }
};

const createPasajero = async (req, res) => {
  try {
    const { documento, nombres, apellidos, correo, password, tipo } = req.body;
    const result = await pool.query(
      "INSERT INTO pasajeros (documento, nombres, apellidos, correo, password, tipo) VALUES (?, ?, ?, ?, ?, ?)",
      [documento, nombres, apellidos, correo, password, tipo]
    );
    if (result[0].affectedRows > 0) {
      return res.json({
        message: "Pasajero creado",
        body: {
          pasajero: { documento, nombres, apellidos, correo, password, tipo },
        },
      });
    } else {
      return res.json({
        message: "No se pudo crear el pasajero",
        body: {
          pasajero: { documento },
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const updatePasajero = async (req, res) => {
    try {
        const cedula = req.params.cedula;
        const { nombres, apellidos, correo, password, tipo } = req.body;
        const result = await pool.query(
        "UPDATE pasajeros SET nombres = ?, apellidos = ?, correo = ?, password = ?, tipo = ? WHERE cedula = ?",
        [nombres, apellidos, correo, password, tipo, cedula]
        );
        if (result[0].affectedRows > 0) {
        return res.json({
            message: "Pasajero actualizado",
            body: {
            pasajero: { nombres, apellidos, correo, password, tipo },
            },
        });
        } else {
        return res.json({
            message: "No se pudo actualizar el pasajero",
            body: {
            pasajero: { cedula },
            },
        });
        }
    } catch (e) {
        console.log(e);
    }
}

const deletePasajero = async (req, res) => {
    try {
        const cedula = req.params.cedula;
        const result = await pool.query(
        "DELETE FROM pasajeros WHERE cedula = ?",
        [cedula]
        );
        if (result[0].affectedRows > 0) {
        return res.json({
            message: "Pasajero eliminado",
            body: {
            pasajero: { cedula },
            },
        });
        } else {
        return res.json({
            message: "No se pudo eliminar el pasajero",
            body: {
            pasajero: { cedula },
            },
        });
        }
    } catch (e) {
        console.log(e);
    }
};

export {
    getPasajeros,
    getPasajeroByCedula,
    createPasajero,
    updatePasajero,
    deletePasajero,
};
