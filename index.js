const express = require('express');
const { getConnection } = require('./db/db-conecction-mongo');
const cors = require('cors');
require('dotenv').config();
const AuthRoute = require('./router/auth');



const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

getConnection();

//parse JSON
app.use(express.json());

app.use('/login', AuthRoute);
app.use('/usuario', require('./router/usuarioRouter'));
app.use('/estado-equipo', require('./router/estadoEquipoRouter'))
app.use('/marca', require('./router/marcaRouter'))
app.use('/tipo-Equipo', require('./router/tipoEquipoRouter'))
app.use('/inventario', require('./router/inventarioRouter'))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});