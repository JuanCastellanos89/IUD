const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const router = Router();

router.post('/', async function(req, res){
    try{
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

router.get('/', async function(req, res){
    try{
        let estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.put('/:estadoEquipoId', async function(req, res){
    try{
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
module.exports = router;