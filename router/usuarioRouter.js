const { Router } = require('express');
const { validarUsuario } = require('../helpers/validarUsuario');
const Usuario = require('../models/Usuario');
const router = Router();
const bcrypt = require('bcryptjs');
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');


router.post('/', [ validarJWT, validarRolAdmin ], async function (req, res) {
    try {
        const validaciones = validarUsuario(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        console.log(req.body);

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        if(existeUsuario){
            return res.send('El e-mail ingresado ya existe...');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;

        const salt = bcrypt.genSaltSync();
        const contrasena = bcrypt.hashSync(req.body.contrasena, salt);
        usuario.contrasena = contrasena;
        usuario.rol = req.body.rol;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();
        usuario = await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.get('/', [ validarJWT, validarRolAdmin ], async function (req, res) {
    try{
        let usuarios = await Usuario.find();
        res.send(usuarios);
    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.put('/:usuarioId', [ validarJWT, validarRolAdmin ], async function (req, res) {
    try {
        const validaciones = validarUsuario(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        console.log(req.body, req.params);
        
        let usuario = await Usuario.findById(req.params.usuarioId);

        if(!usuario){
            return res.send('El usuario no existe...');
        }
        
        const existeUsuario = await Usuario.findOne({email: req.body.email, _id: {$ne: usuario._id}});
        console.log('El usuario ya existe...', existeUsuario);

        if (existeUsuario){
            return res.send('El e-mail ya existe...');
        }

        usuario.email = req.body.email;
        usuario.nombre = req.body.nombre;
        usuario.contrasena = contrasena;
        usuario.rol = req.body.rol;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();
        usuario = await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.get('/:usuarioId', [ validarJWT, validarRolAdmin ], async function(req, res) {
    try{
        const usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario) {
            return res.status(404).send('Usuario no Existe!!!');
        } 
        res.send(usuario);
    }catch(error){
        console.log(error);
        res.status(500).send('Error algo a fallado en actualizar Usuario');
    }
});

module.exports = router;