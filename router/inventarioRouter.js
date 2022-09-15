const { Router } = require('express');
const Inventario = require('../models/Inventario');
const router = Router();

router.post('/', async function(req, res){
    try{
        const existeInventarioSerial = await Inventario.findOne({ serial: req.body.serial});
        if(existeInventarioSerial){
            return res.send('Ya existe el serial para otro equipo!!!');
        }
        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();
        
        inventario = await inventario.save();
        res.send(inventario);
    }catch(error){
        console.log(error);
        res.send('Error algo a fallado en Inventario');
    }
    
});

router.get('/', async function(req, res){
    try{
        const inventarios = await Inventario.find();
        res.send(inventarios);
    }catch(error){
        console.log(error);
        res.send('Error algo a fallado en Inventario');
    }
});

router.put('/', function(req, res){
    res.send('Hola estoy en Inventario PUT');
});
module.exports = router;