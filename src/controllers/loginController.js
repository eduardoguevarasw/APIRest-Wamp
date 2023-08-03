import {pool} from '../db.js'

//autehtication user
const getUser = async (req, res) => {
    try{
        const usuario = req.params.usuario;
        const password = req.params.password;
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',[usuario, password]
        )
        //un if corto 
        result[0].length > 0 ? res.json(result[0]) : res.json({message: 'Usuario o contraseña incorrectos'});
    }catch(e){
        console.log(e);
    }
}

export {
    getUser
}



