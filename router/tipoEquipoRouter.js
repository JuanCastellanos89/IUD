const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const router = Router();
const {validarTipoEquipo} = require ('../helpers/validarTipoEquipo');

router.post('/', async function(req, res){
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

router.get('/', async function(req, res){
    try{
        let tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.put('/:tipoEquipoId', async function(req, res){
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
module.exports = router;