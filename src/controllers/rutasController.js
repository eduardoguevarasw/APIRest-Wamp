import { pool } from "../db.js";

const getRutas = async (req, res) => {
  try {
    const result = await pool.query(
      //idRuta idCooperativa idEmbarcacion idOrigen idDestino hora_salida hora_llegada lunes martes miercoles jueves viernes sabado domingo estado
      " SELECT r.idRuta, c.nombre AS cooperativa, e.nombre AS embarcacion, o.nombre AS origen, d.nombre AS destino,d.valor AS precio, r.hora_salida, r.hora_llegada, r.lunes, r.martes, r.miercoles, r.jueves, r.viernes, r.sabado, r.domingo, r.estado FROM ruta r INNER JOIN cooperativa c ON r.idCooperativa = c.idCoop INNER JOIN embarcacion e ON r.idEmbarcacion = e.idEmbarcacion INNER JOIN origen o ON r.idOrigen = o.idOrigen INNER JOIN destino d ON r.idDestino = d.idDestino"
    );
    res.json(result[0]);
  } catch (e) {
    console.log(e);
  }
};

const getRutaById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      " SELECT r.idRuta, c.nombre AS cooperativa, e.nombre AS embarcacion, o.nombre AS origen, d.nombre AS destino, r.hora_salida, r.hora_llegada, r.lunes, r.martes, r.miercoles, r.jueves, r.viernes, r.sabado, r.domingo, r.estado FROM ruta r INNER JOIN cooperativa c ON r.idCooperativa = c.idCoop INNER JOIN embarcacion e ON r.idEmbarcacion = e.idEmbarcacion INNER JOIN origen o ON r.idOrigen = o.idOrigen INNER JOIN destino d ON r.idDestino = d.idDestino WHERE r.idRuta = ?",
      [id]
    );
    res.json(result[0]);
  } catch (e) {
    console.log(e);
  }
};

const createRuta = async (req, res) => {
  const {
    idCooperativa,
    idEmbarcacion,
    idOrigen,
    idDestino,
    hora_salida,
    hora_llegada,
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo,
    estado,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO ruta (idCooperativa, idEmbarcacion, idOrigen, idDestino, hora_salida, hora_llegada, lunes, martes, miercoles, jueves, viernes, sabado, domingo, estado) VALUES (?,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)",
      [
        idCooperativa,
        idEmbarcacion,
        idOrigen,
        idDestino,
        hora_salida,
        hora_llegada,
        lunes,
        martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
        estado,
      ]
    );
    if (result[0].affectedRows > 0) {
        return res.json({
            message: "Ruta creada",
            body: {
            ruta: {
                idCooperativa,
                idEmbarcacion,
                idOrigen,
                idDestino,
                hora_salida,
                hora_llegada,
                lunes,
                martes,
                miercoles,
                jueves,
                viernes,
                sabado,
                domingo,
                estado,
            },
            },
        });
    }else{
        return res.json({
            message: "Error al crear la ruta",
            body: {
            ruta: {
                idCooperativa,
                idEmbarcacion,
                idOrigen,
                idDestino,
                hora_salida,
                hora_llegada,
                lunes,
                martes,
                miercoles,
                jueves,
                viernes,
                sabado,
                domingo,
                estado,
            },
            },
        });
    }
  } catch (e) {
    console.log(e);
  }
};

const updateRuta = async (req, res) => {
    const id = req.params.id;
    const {
        idCooperativa,
        idEmbarcacion,
        idOrigen,
        idDestino,
        hora_salida,
        hora_llegada,
        lunes,
        martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
        estado,
    } = req.body;
    try {
        const result = await pool.query(
        "UPDATE ruta SET idCooperativa = ?, idEmbarcacion = ?, idOrigen = ?, idDestino = ?, hora_salida = ?, hora_llegada = ?, lunes = ?, martes = ?, miercoles = ?, jueves = ?, viernes = ?, sabado = ?, domingo = ?, estado = ? WHERE idRuta = ?",
        [
            idCooperativa,
            idEmbarcacion,
            idOrigen,
            idDestino,
            hora_salida,
            hora_llegada,
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
            domingo,
            estado,
            id,
        ]
        );
        if (result[0].affectedRows > 0) {
            return res.json({
                message: "Ruta actualizada",
                body: {
                ruta: {
                    idCooperativa,
                    idEmbarcacion,
                    idOrigen,
                    idDestino,
                    hora_salida,
                    hora_llegada,
                    lunes,
                    martes,
                    miercoles,
                    jueves,
                    viernes,
                    sabado,
                    domingo,
                    estado,
                },
                },
            });
        }else{
            return res.json({
                message: "Error al actualizar la ruta",
                body: {
                ruta: {
                    idCooperativa,
                    idEmbarcacion,
                    idOrigen,
                    idDestino,
                    hora_salida,
                    hora_llegada,
                    lunes,
                    martes,
                    miercoles,
                    jueves,
                    viernes,
                    sabado,
                    domingo,
                    estado,
                },
                },
            });
        }
    } catch (e) {
        console.log(e);
    }
}

const deleteRuta = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query("DELETE FROM ruta WHERE idRuta = ?", [id]);
        if (result[0].affectedRows > 0) {
            return res.json({
                message: "Ruta eliminada",
                body: {
                ruta: {
                    id,
                },
                },
            });
        }else{
            return res.json({
                message: "Error al eliminar la ruta",
                body: {
                ruta: {
                    id,
                },
                },
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export  {
    getRutas,
    getRutaById,
    createRuta,
    updateRuta,
    deleteRuta
}