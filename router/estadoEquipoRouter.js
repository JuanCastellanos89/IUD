const { Router } = require('express');
const { validarEstadoEquipo } = require('../helpers/validarEstadoEquipo');
const EstadoEquipo = require('../models/EstadoEquipo');
const router = Router();
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

router.post('/', [ validarJWT, validarRolAdmin ], async function(req, res){
    try{
        const validaciones = validarEstadoEquipo(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...')
    }
});

router.get('/', [ validarJWT, validarRolAdmin ], async function(req, res){
    try{
        let estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.put('/:estadoEquipoId', [ validarJWT, validarRolAdmin ], async function(req, res){
    try{
        const validaciones = validarEstadoEquipo(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

        if(!estadoEquipo){
            return res.send('El estado del equipo no existe...');
        }
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado');
    }
});

router.get('/:estadoEquipoId', [ validarJWT, validarRolAdmin ], async function(req, res) {
    try{
        const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo) {
            return res.status(404).send('Estado de Equipo no Existe!!!');
        } 
        res.send(estadoEquipo);
    }catch(error){
        console.log(error);
        res.status(500).send('Error algo a fallado en actualizar Estado de Equipo');
    }
});

module.exports = router;