import { pool } from "../db.js";

//registrar viaje
const detallePasajero = async (req, res) => {
  //se recibe el idRuta y el numero de documento del pasajero para registrar el viaje
  try {
    const data = req.body;
    const idRuta = req.params.idRuta;
    const fecha = req.params.fecha;
    //buscar el idViaje de la tabla viaje
    const idViaje = await pool.query(
      "SELECT idViaje FROM viaje WHERE idRuta = ? AND fecha = ?",
      [idRuta, fecha]
    );
    //si no hay viaje registrado con esa ruta y fecha, crea en la tabla viaje
    if (idViaje[0].length == 0) {
      //crea un viaje con la ruta y fecha
      await pool.query("INSERT INTO viaje (idRuta, fecha) VALUES (?, ?)", [
        idRuta,
        fecha,
      ]);
      //mostrar el idViaje creado
      const viaje = await pool.query(
        "SELECT idViaje FROM viaje WHERE idRuta = ? AND fecha = ?",
        [idRuta, fecha]
      );
      let idViajeObtenido = viaje[0][0].idViaje;
      //recorrer el array de pasajeros y por cada uno obtener el idPasajero
      for (let i = 0; i < data.length; i++) {
        const pasajero = await pool.query(
          "SELECT idPasajero FROM pasajeros WHERE documento = ?",
          [data[i].documento]
        );
        let idPasajero = pasajero[0][0].idPasajero;
        //insertar en la tabla detalle pasajero
        await pool.query(
          "INSERT INTO detallePasajero (idViaje, idPasajero,asiento,total) VALUES (?, ?, ?, ?)",
          [idViajeObtenido, idPasajero, data[i].asiento, data[i].precioPasajero]
        );
      }
      let dataJson = JSON.stringify(data);
      await pool.query("INSERT INTO ticket (cliente,pasajeros) VALUES (?, ?)", [
        data[0].documento,
        dataJson,
      ]);
      res.status(200).json({ message: "Viaje registrado" });
    } else {
      //si ya hay un viaje registrado con esa ruta y fecha, se obtiene el idViaje
      let idViajeObtenido = idViaje[0][0].idViaje;
      //recorrer el array de pasajeros y por cada uno obtener el idPasajero
      for (let i = 0; i < data.length; i++) {
        const pasajero = await pool.query(
          "SELECT idPasajero FROM pasajeros WHERE documento = ?",
          [data[i].documento]
        );
        let idPasajero = pasajero[0][0].idPasajero;
        //insertar en la tabla detalle pasajero
        await pool.query(
          "INSERT INTO detallePasajero (idViaje, idPasajero,asiento,total) VALUES (?, ?, ?, ?)",
          [idViajeObtenido, idPasajero, data[i].asiento, data[i].precioPasajero]
        );
      }

      //convertir la data en json 
      let dataJson = JSON.stringify(data);
      //guardar en la tabla tickets los datos del viaje
      await pool.query("INSERT INTO ticket (cliente,pasajeros) VALUES (?, ?)", [
        data[0].documento,
        dataJson,
      ]);

      res.status(200).json({ message: "Viaje registrado" });
    }
  } catch (e) {
    console.log("El error que se encontro" + e);
  }
};

export { detallePasajero };
