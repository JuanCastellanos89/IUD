const express = require('express');
const { getConnection } = require('./db/db-conecction-mongo');


const port = 3000;
const app = express();

getConnection();

//parse JSON
app.use(express.json());

app.use('/usuario', require('./router/usuarioRouter'));
app.use('/estado-equipo', require('./router/estadoEquipoRouter'))
app.use('/marca', require('./router/marcaRouter'))
app.use('/tipo-Equipo', require('./router/tipoEquipoRouter'))
app.use('/inventario', require('./router/inventarioRouter'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});