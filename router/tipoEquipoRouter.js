const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const router = Router();
const {validarTipoEquipo} = require ('../helpers/validarTipoEquipo');
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

router.post('/',[ validarJWT, validarRolAdmin ], async function(req, res){
    try{
        const validaciones = validarTipoEquipo(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }    
});

router.get('/', [ validarJWT, validarRolAdmin ], async function(req, res){
    try{
        let tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.put('/:tipoEquipoId', [ validarJWT, validarRolAdmin ], async function(req, res){
    try{
        const validaciones = validarTipoEquipo(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        
        if(!tipoEquipo){
            return res.send('El tipo del equipo no existe...');
        }
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }    
});

router.get('/:tipoEquipoId', [ validarJWT, validarRolAdmin ], async function(req, res) {
    try{
        const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo) {
            return res.status(404).send('Tipo de Equipo no Existe!!!');
        } 
        res.send(tipoEquipo);
    }catch(error){
        console.log(error);
        res.status(500).send('Error algo a fallado en actualizar Tipo de Equipo');
    }
});

module.exports = router;