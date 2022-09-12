const { Router } = require('express');
const router = Router();

router.post('/', function(req, res){
    res.send('Hola estoy en Inventario POST');
});

router.get('/', function(req, res){
    res.send('Hola estoy en Inventario GET');
});

router.put('/', function(req, res){
    res.send('Hola estoy en Inventario PUT');
});
module.exports = router;