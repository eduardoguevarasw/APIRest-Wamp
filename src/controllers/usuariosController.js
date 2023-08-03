import { pool } from "../db.js";

const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result[0]);
  } catch (e) {
    console.log(e);
  }
};

const getUsuarioByUser = async (req, res) => {
  try {
    const usuario = req.params.usuario;
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );
    res.json(result[0]);
  } catch (e) {
    console.log(e);
  }
};

const createUsuario = async (req, res) => {
  try {
    const {
      usuario,
      password,
      nombres,
      apellidos,
      correo,
      foto,
      rol,
      cooperativa,
      estado,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO usuarios (usuario, password, nombres, apellidos, correo, foto, rol, cooperativa, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        usuario,
        password,
        nombres,
        apellidos,
        correo,
        foto,
        rol,
        cooperativa,
        estado,
      ]
    );
    return res.json({
        message: "Usuario creado",
        body: {
            usuario: { usuario },
        }
    });
  } catch (e) {
    console.log(e);
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuario = req.params.usuario;
    const {
      password,
      nombres,
      apellidos,
      correo,
      foto,
      rol,
      cooperativa,
      estado,
    } = req.body;
    const result = await pool.query(
      "UPDATE usuarios SET password = ?, nombres = ?, apellidos = ?, correo = ?, foto = ?, rol = ?, cooperativa = ?, estado = ? WHERE usuario = ?",
      [
        password,
        nombres,
        apellidos,
        correo,
        foto,
        rol,
        cooperativa,
        estado,
        usuario,
      ]
    );
    if (result.affectedRows === 0) {
      return res.json({
        message: "Usuario no actualizado",
        body: {
          usuario: { usuario },
        },
      });
    }
    res.json({
      message: "Usuario actualizado",
      body: {
        usuario: { usuario },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const usuario = req.params.usuario;
    const result = await pool.query("DELETE FROM usuarios WHERE usuario = ?", [
      usuario,
    ]);
    if (result.affectedRows === 0) {
      return res.json({
        message: "Usuario no eliminado",
        body: {
          usuario: { usuario },
        },
      });
    }
    res.json({
      message: "Usuario eliminado",
      body: {
        usuario: { usuario },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export {
  getUsuarios,
  getUsuarioByUser,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
