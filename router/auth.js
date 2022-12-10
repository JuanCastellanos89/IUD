const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const router = Router();
const { generarJWT } = require('../helpers/jwt');

router.post('/', [
    check('email', 'email.requerido').isEmail(),
    check('contrasena', 'contrasena.requerida').not().isEmpty()
] ,async function (req, res){

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(600).json({ mensaje: errors.array });
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'User not found...' });
        }

        const esIgual = bcrypt.compareSync(req.body.contrasena, usuario.contrasena);
        if(!esIgual){
            return res.status(400).json({ mensaje: 'User not found...' });
        }

        const token = generarJWT(usuario);

        res.json({_id: usuario._id, nombre: usuario.nombre, email: usuario.email,
                    rol: usuario.rol, estado: usuario.estado, acces_token: token})

    }catch(error){
        console.log(error);
        res.status(500).json({ mensaje: 'Internal Server Error' });
    }
    
})

module.exports = router;
