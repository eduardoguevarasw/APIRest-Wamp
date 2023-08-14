import { pool } from "../db.js";

const getRutas = async (req, res) => {
  const cooperativa = req.params.cooperativa;
  try {
    const result = await pool.query(
      //idRuta idCooperativa idEmbarcacion idOrigen idDestino hora_salida hora_llegada lunes martes miercoles jueves viernes sabado domingo estado
      " SELECT r.idRuta, c.nombre AS cooperativa, e.nombre AS embarcacion, o.nombre AS origen, d.nombre AS destino,d.valor AS precio, r.hora_salida, r.hora_llegada, r.lunes, r.martes, r.miercoles, r.jueves, r.viernes, r.sabado, r.domingo, r.estado FROM ruta r INNER JOIN cooperativa c ON r.idCooperativa = c.idCoop INNER JOIN embarcacion e ON r.idEmbarcacion = e.idEmbarcacion INNER JOIN origen o ON r.idOrigen = o.idOrigen INNER JOIN destino d ON r.idDestino = d.idDestino WHERE c.nombre = ? AND r.estado = 'activo' ",
      [cooperativa]
    );
    res.json(result[0]);
  } catch (e) {
    console.log(e);
  }
};

const getRutaById = async (req, res) => {
  try {
    const id = req.params.id;
    const fecha = req.params.fecha;
    const result = await pool.query(
      " SELECT r.idRuta, c.nombre AS cooperativa, d.valor AS precio , e.nombre AS embarcacion,e.capacidad AS capacidad , o.nombre AS origen, d.nombre AS destino, r.hora_salida, r.hora_llegada, r.lunes, r.martes, r.miercoles, r.jueves, r.viernes, r.sabado, r.domingo, r.estado FROM ruta r INNER JOIN cooperativa c ON r.idCooperativa = c.idCoop INNER JOIN embarcacion e ON r.idEmbarcacion = e.idEmbarcacion INNER JOIN origen o ON r.idOrigen = o.idOrigen INNER JOIN destino d ON r.idDestino = d.idDestino WHERE r.idRuta = ? AND r.estado = 'activo' ",
      [id]
    );
    //obtener el idViaje con el idRuta
    const resutl2 = await pool.query(
      "SELECT * FROM `viaje` WHERE fecha = ? AND idRuta = ?",
      [fecha, id]
    );
    const asientosOcupados = [];
    //si existe el viaje
    if (resutl2[0].length > 0) {
      const idViaje = resutl2[0][0].idViaje;
      //traer los asientos ocupados de detallePasajero con el idViaje
      const result3 = await pool.query(
        "SELECT * FROM `detallePasajero` WHERE idViaje = ?",
        [idViaje]
      );
      //llenar el vector con los asientos ocupados
      for (let i = 0; i < result3[0].length; i++) {
        asientosOcupados.push(result3[0][i].asiento);
      }
    }

    const dataRuta = {
      idRuta: result[0][0].idRuta,
      cooperativa: result[0][0].cooperativa,
      embarcacion: result[0][0].embarcacion,
      capacidad: result[0][0].capacidad,
      origen: result[0][0].origen,
      destino: result[0][0].destino,
      precio: result[0][0].precio,
      hora_salida: result[0][0].hora_salida,
      hora_llegada: result[0][0].hora_llegada,
      lunes: result[0][0].lunes,
      martes: result[0][0].martes,
      miercoles: result[0][0].miercoles,
      jueves: result[0][0].jueves,
      viernes: result[0][0].viernes,
      sabado: result[0][0].sabado,
      domingo: result[0][0].domingo,
      estado: result[0][0].estado,
      asientos: asientosOcupados,
    };
    return res.status(200).json(dataRuta);
  } catch (e) {
    console.log(e);
  }
};

const createRuta = async (req, res) => {
  const cooperativa = req.body.cooperativa;
  const embarcacion = req.body.embarcacion;
  const origen = req.body.origen;
  const destino = req.body.destino;
  const precio = req.body.precio;
  const hora_salida = req.body.hora_salida;
  const hora_llegada = req.body.hora_llegada;
  const lunes = req.body.lunes;
  const martes = req.body.martes;
  const miercoles = req.body.miercoles;
  const jueves = req.body.jueves;
  const viernes = req.body.viernes;
  const sabado = req.body.sabado;
  const domingo = req.body.domingo;
  const estado = req.body.estado;


  //obtener el id de la cooperativa
  const result1 = await pool.query(
    "SELECT * FROM cooperativa WHERE nombre = ?",
    [cooperativa]
  );

  const idcoop = result1[0][0].idCoop;

  //obtener el id de la embarcacion
  const result2 = await pool.query(
    "SELECT * FROM embarcacion WHERE nombre = ?",
    [embarcacion]
  );

  const idembarcacion = result2[0][0].idEmbarcacion;

  //obtener el id del origen
  const result3 = await pool.query(
    "SELECT idOrigen FROM origen WHERE nombre = ?",
    [origen]
  );

  const iporigen = result3[0][0].idOrigen;

  //consultar si existe el destino
  const result4 = await pool.query(
    "SELECT idDestino FROM destino WHERE nombre = ?",
    [destino]
  );
  let iddestino = 0;
  //si no existe el destino se crea
  if (result4[0].length == 0) {
    await pool.query(
      "INSERT INTO destino (nombre,valor,idOrigen) VALUES (?,?,?)",
      [destino, precio, result3[0][0].idOrigen]
    );
    //se obtiene el id del destino
    const result5 = await pool.query("SELECT * FROM destino WHERE nombre = ?", [
      destino,
    ]);
    iddestino=result5[0][0].idDestino;
  } else {
    //si existe el destino se obtiene el id
    iddestino = result4[0][0].idDestino;
  }

  try{
    const result = await pool.query(
      "INSERT INTO ruta (idCooperativa,idEmbarcacion,idOrigen,idDestino,hora_salida,hora_llegada,estado,lunes,martes,miercoles,jueves,viernes,sabado,domingo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        idcoop,
        idembarcacion,
        iporigen,
        iddestino,
        hora_salida,
        hora_llegada,
        estado,
        lunes,
        martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
      ]
    );
    if (result[0].affectedRows > 0) {
      return res.json({
        message: "Ruta creada",
        body: {
          ruta: {
            idcoop,
            idembarcacion,
            iporigen,
            iddestino,
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
    } else {
      return res.json({
        message: "Error al crear la ruta",
        body: {
          ruta: {
            idcoop,
            idembarcacion,
            iporigen,
            iddestino,
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

  }catch(e){
    console.log(e);
  }
};

const updateRuta = async (req, res) => {
  const id = req.params.id;
  const {
    origen,
    destino,
    embarcacion,
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo,
    hora_salida,
    hora_llegada,
    precio,
    estado,
    cooperativa,
  } = req.body;

  //obtener el id de la cooperativa
  const result1 = await pool.query(
    "SELECT * FROM cooperativa WHERE nombre = ?",
    [cooperativa]
  );
  const idCooperativa = result1[0][0].idCoop;

  //obtener el id de la embarcacion
  const result2 = await pool.query(
    "SELECT * FROM embarcacion WHERE nombre = ?",
    [embarcacion]
  );
  const idEmbarcacion = result2[0][0].idEmbarcacion;

  //obtener el id del origen
  const result3 = await pool.query(
    "SELECT * FROM origen WHERE nombre = ?",
    [origen]
  );
  const idOrigen = result3[0][0].idOrigen;

  //obtener el id del destino
  const result4 = await pool.query(
    "SELECT * FROM destino WHERE nombre = ?",
    [destino]
  );

  const idDestino = result4[0][0].idDestino;

  try {
    const result = await pool.query(
      " UPDATE ruta SET idCooperativa = ?, idEmbarcacion = ?, idOrigen = ?, idDestino = ?, hora_salida = ?, hora_llegada = ?, lunes = ?, martes = ?, miercoles = ?, jueves = ?, viernes = ?, sabado = ?, domingo = ?, estado = ? WHERE idRuta = ?",
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
      ],
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
            id,
          },
        },
      });
    } else {
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
};

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
    } else {
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
};

const getRutaByOrigenDestino = async (req, res) => {
  const origen = req.params.origen;
  const destino = req.params.destino;
  const cooperativa = req.params.cooperativa;
  const dia = req.params.dia;
  try {
    const result = await pool.query(
      //traer los nombres del origen,destino y cooperativa con inner join
      " SELECT r.idRuta, c.nombre AS cooperativa, e.nombre AS embarcacion, o.nombre AS origen, d.nombre AS destino,d.valor AS precio, r.hora_salida, r.hora_llegada, r.lunes, r.martes, r.miercoles, r.jueves, r.viernes, r.sabado, r.domingo, r.estado FROM ruta r INNER JOIN cooperativa c ON r.idCooperativa = c.idCoop INNER JOIN embarcacion e ON r.idEmbarcacion = e.idEmbarcacion INNER JOIN origen o ON r.idOrigen = o.idOrigen INNER JOIN destino d ON r.idDestino = d.idDestino WHERE o.nombre = ? AND d.nombre = ? AND c.nombre = ? ",
      [origen, destino, cooperativa]
    );
    //buscar el dia en la base de datos este con 1 o 0
    if (result[0].length > 0) {
      switch (dia) {
        case "lunes":
          if (result[0][0].lunes == 1) {
            return res.send(result[0]);
          } else {
            return res.json({
              message: "No disponible",
            });
          }
          break;
        case "martes":
          if (result[0][0].martes == 1) {
            return res.send(result[0]);
          } else {
            return res.json({
              message: "No disponible",
            });
          }
          break;
        case "miercoles":
          if (result[0][0].miercoles == 1) {
            return res.send(result[0]);
          } else {
            return res.json({
              message: "No disponible",
            });
          }
          break;
        case "jueves":
          if (result[0][0].jueves == 1) {
            return res.send(result[0]);
          } else {
            return res.json({
              message: "No disponible",
            });
          }
          break;
        case "viernes":
          if (result[0][0].viernes == 1) {
            return res.send(result[0]);
          } else {
            return res.json({
              message: "No disponible",
            });
          }
          break;
        case "sabado":
          if (result[0][0].sabado == 1) {
            return res.send(result[0]);
          } else {
            return res.json({
              message: "No disponible",
            });
          }
          break;
        case "domingo":
          if (result[0][0].domingo == 1) {
            return res.send(result[0]);
          } else {
            return res.json({
              message: "No disponible",
            });
          }
          break;
        default:
          return res.json({
            message: "No disponible",
          });
          break;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getRutaById2 = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      " SELECT r.idRuta, c.nombre AS cooperativa, e.nombre AS embarcacion, o.nombre AS origen, d.nombre AS destino,d.valor AS precio, r.hora_salida, r.hora_llegada, r.lunes, r.martes, r.miercoles, r.jueves, r.viernes, r.sabado, r.domingo, r.estado FROM ruta r INNER JOIN cooperativa c ON r.idCooperativa = c.idCoop INNER JOIN embarcacion e ON r.idEmbarcacion = e.idEmbarcacion INNER JOIN origen o ON r.idOrigen = o.idOrigen INNER JOIN destino d ON r.idDestino = d.idDestino WHERE r.idRuta = ?",
      [id]
    );
    res.json(result[0][0]);
  }catch(e){
    console.log(e);
  }
};
export {
  getRutas,
  getRutaById,
  getRutaById2,
  createRuta,
  updateRuta,
  deleteRuta,
  getRutaByOrigenDestino,
};
