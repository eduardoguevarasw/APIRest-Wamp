import { pool } from "../db.js";
import PDFdocument from "pdfkit";
const getPDF = async (req, res) => {
  try {
    const idRuta = req.params.idRuta;
    const fecha = req.params.fecha;
    //buscar el idViaje de la tabla viaje
    const id_viaje = await pool.query(
      "SELECT idViaje FROM viaje WHERE idRuta = ? AND fecha = ?",
      [idRuta, fecha]
    );

    let id = id_viaje[0][0].idViaje;
    const datospasajeros = await pool.query(
      "SELECT v.idViaje as idViaje, v.fecha as fecha, p.documento AS documento,p.nombres AS nombres,p.apellidos as apellidos,det.asiento as asiento,det.total as valor FROM detallePasajero det INNER JOIN viaje v ON v.idViaje = det.idViaje INNER JOIN pasajeros p  ON p.idPasajero = det.idPasajero WHERE v.idViaje = ?",
      [id]
    );

    //buscar los datos de la ruta
    const datosRuta = await pool.query(
      "SELECT c.nombre as cooperativa,c.RUC as RUC,c.direccion as direccion ,e.nombre as embarcacion,o.Nombre as origen,d.nombre as destino,r.hora_salida as hora_salida,r.hora_llegada as hora_llegada FROM ruta r INNER JOIN cooperativa c  ON c.idCoop = r.idCooperativa INNER JOIN embarcacion e ON e.idEmbarcacion = r.idEmbarcacion INNER JOIN origen o  ON o.idOrigen = r.idOrigen INNER JOIN destino d  ON d.idDestino = r.idDestino WHERE idRuta = ?",
      [idRuta]
    );
    //console.log(datosRuta[0][0].cooperativa);
    //hacer el doc de 8cm de ancho y el largo que se vaya ajustando al contenido
    const doc = new PDFdocument({
      size: [200, 500],
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=orden_" + idRuta + ".pdf"
    );
    doc.pipe(res);
    //cambiar el tipo de letra a helvetica
    doc.font("Helvetica-Bold");
    ///en medio del rectangulo poner el nombre de la cooperativa
    doc.text(datosRuta[0][0].cooperativa, 10, 30, { align: "center" });
    //cambiar el tipo de letra a helvetica
    doc.font("Helvetica");
    //cambiar el tamaño de la letra a 10
    doc.fontSize(8);
    doc.text("RUC:" + datosRuta[0][0].RUC, 10, 80, { align: "center" });
    doc.text("DIR:" + datosRuta[0][0].direccion, 10, 90, { align: "left" });
    //linea horizontal
    doc.moveTo(10, 100).lineTo(190, 100).stroke();
    //datos del viaje con una linea
    //un cuadro con los datos del viaje
    doc.rect(10, 104, 180, 12).stroke();
    //negrita
    doc.font("Helvetica-Bold");
    doc.text("DATOS DE VIAJE:", 12, 108, { align: "center" });
    //letra normal y tamaño 8
    doc.font("Helvetica");
    doc.text("DESTINO:", 10, 120, { align: "left" });
    //letra en negrita y tamaño 12
    doc.font("Helvetica-Bold");
    doc.fontSize(12);
    doc.text(datosRuta[0][0].destino, 10, 130, { align: "left" });
    //letra normal y tamaño 8
    doc.font("Helvetica");
    doc.fontSize(8);
    doc.text("FECHA DE SALIDA :", 10, 145, { align: "left" });
    //letra en negrita y tamaño 12
    doc.font("Helvetica-Bold");
    doc.fontSize(12);
    doc.text(fecha, 10, 155, { align: "left" });
    //letra normal y tamaño 8
    doc.font("Helvetica");
    doc.fontSize(8);
    doc.text("EMBARCACION:", 10, 170, { align: "left" });
    //letra en negrita y tamaño 12
    doc.font("Helvetica-Bold");
    doc.fontSize(12);
    doc.text(datosRuta[0][0].embarcacion, 10, 180, { align: "left" });
    //un cuadro con los datos de los pasajeros
    doc.rect(10, 195, 180, 12).stroke();
    //letra normal y tamaño 8
    doc.font("Helvetica-Bold");
    doc.fontSize(8);
    doc.text("DATOS DE PASAJEROS:", 12, 198, { align: "center" });
    //asiento nombre precio
    doc.text("ASIENTO", 10, 210, { align: "left" });
    doc.text("NOMBRE", 70, 210, { align: "left" });
    doc.text("VALOR", 150, 210, { align: "left" });
    //linea horizontal
    doc.moveTo(10, 220).lineTo(190, 220).stroke();
    //letra normal y tamaño 8
    doc.font("Helvetica");
    doc.fontSize(10);
    //datos de los pasajeros
    const columnWidth = 50; // Ancho de cada columna
    const gutter = 10; // Espacio entre columnas
    let y = 230;
    for (let i = 0; i < datospasajeros.length; i++) {
      doc.text(datospasajeros[0][i].asiento, 10, y, {
        align: "left",
        width: 20,
        height: 20,
      });
      doc.text(
        datospasajeros[0][i].nombres + " " + datospasajeros[0][i].apellidos,
        30,
        y,
        {
          align: "left",
          width: 200,
          height: 20,
        }
      );
      doc.text(datospasajeros[0][i].valor, 130, y, {
        align: "right",
        width: 60,
        height: 20,
      });
      y = y + 10;
    }
    //linea horizontal
    doc.moveTo(10, y).lineTo(190, y).stroke();
    //letra normal y tamaño 8
    doc.font("Helvetica");
    doc.fontSize(8);
    doc.text("TOTAL:", 10, y + 10, { align: "left" });
    //letra en negrita y tamaño 12
    doc.font("Helvetica-Bold");
    doc.fontSize(11);
    doc.text("$" + "105.95", 130, y + 10, {
      align: "right",
      width: 60,
      height: 20,
    });
    //linea horizontal
    doc
      .moveTo(10, y + 20)
      .lineTo(190, y + 20)
      .stroke();
    //letra normal y tamaño 8
    doc.font("Helvetica");
    doc.fontSize(8);
    doc.text("GRACIAS POR SU COMPRA", 10, y + 30, { align: "center" });
    //letra normal y tamaño 8
    doc.font("Helvetica");
    doc.fontSize(8);
    doc.text("RECUERDE LLEGAR CON 30 MINUTOS DE ANTICIPACION", 10, y + 50, {
      align: "center",
    });
    //texto puedes comprar tu ticket en en www.wampuna.com o en la app de wampuna en playstore o appstore
    doc.text("PUEDES COMPRAR TU TICKET EN:", 10, y + 70, {
      align: "center",
    });
    doc.font("Helvetica");
    doc.fontSize(8);
    doc.text("www.wampuna.com", 10, y + 90, {
      align: "center",
    });
    doc.font("Helvetica");
    doc.fontSize(8);
    doc.text("O EN LA APP DE WAMPUNA EN PLAYSTORE O APPSTORE", 10, y + 100, {
      align: "center",
    });

    doc.end();
  } catch (e) {
    console.log(e);
  }
};

const postticket = async (req, res) => {
  try {
    const idRuta = req.params.idRuta;
    const fecha = req.params.fecha;
    const data = req.body;
    const doc = new PDFdocument({
      size: [200, 500],
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=orden_" + idRuta + ".pdf"
    );
    doc.pipe(res);
    doc.text("ORDEN DE COMPRA", 10, 10, { align: "center" });
    doc.text(idRuta, 10, 20, { align: "center" });
    doc.text(fecha, 10, 30, { align: "center" });
    doc.end();
  } catch (e) {
    console.log(e);
  }
};

export { getPDF, postticket };
