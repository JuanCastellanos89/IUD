const { Router } = require('express');
const { validarMarca } = require('../helpers/validarMarca');
const Marca = require('../models/Marca');
const router = Router();

router.post('/', async function(req, res){
    try{
        const validaciones = validarMarca(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req. body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
        marca = await marca.save();
        res.send(marca);
    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.get('/', async function(req, res){
    try{
        let marcas = await Marca.find();
        res.send(marcas);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }
});

router.put('/:marcaId', async function(req, res){
    try{
        const validaciones = validarMarca(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let marca = await Marca.findById(req.params.marcaId);

        if(!marca){
            return res.send('La marca no existe...');
        }
        marca.nombre = req.body.nombre;
        marca.estado = req. body.estado;
        marca.fechaActualizacion = new Date();
        marca = await marca.save();
        res.send(marca);

    }catch(error){
        console.log(error);
        res.send('Error algo a fallado...');
    }
    
});
module.exports = router;