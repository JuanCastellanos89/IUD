const { Router } = require('express');
const Inventario = require('../models/Inventario');
const router = Router();
const { validarInventario } = require('../helpers/validarInventario');

router.post('/', async function(req, res){
    try{
        const validaciones = validarInventario(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        const existeInventarioSerial = await Inventario.findOne({ serial: req.body.serial});
        if(existeInventarioSerial){
            return res.status(400).send('Ya existe el serial para otro equipo!!!');
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
        res.status(500).send('Error algo a fallado al crear en Inventario');
    }
    
});

router.get('/', async function(req, res){
    try{
        const inventarios = await Inventario.find().populate([
            {
                path: 'usuario', select: 'nombre email estado'
            },
            {
                path: 'marca', select: 'nombre estado'
            },
            {
                path: 'tipoEquipo', select: 'nombre estado'            
            },
            {
                path: 'estadoEquipo', select: 'nombre estado'
            }
        ]);
        res.send(inventarios);
    }catch(error){
        console.log(error);
        res.status(500).send('Error algo a fallado en Inventario');
    }
});

router.put('/:inventarioId', async function(req, res){
    try{
        const validaciones = validarInventario(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario){
            return res.status(400).send('Inventario no existe!!!');
        }

        const existeInventarioSerial = await Inventario.findOne(
            { serial: req.body.serial, _id: { $ne: inventario._id }});
        
        if(existeInventarioSerial){
            return res.status(400).send('Ya existe el serial para otro equipo!!!');
        }

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
        inventario.fechaActualizacion = new Date();        
        inventario = await inventario.save();
        res.send(inventario);

    }catch(error){
        console.log(error);
        res.status(500).send('Error algo a fallado en actualizar Inventario');
    }
});

router.get('/:inventarioId', async function(req, res) {
    try{
        const inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario) {
            return res.status(404).send('Inventario no Existe!!!');
        } 
        res.send(inventario);
    }catch(error){
        console.log(error);
        res.status(500).send('Error algo a fallado en actualizar Inventario');
    }
});

module.exports = router;