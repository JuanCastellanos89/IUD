const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    const payload = {_id: usuario._id, nombre: usuario.nombre, email: usuario.email,
        rol: usuario.rol, estado: usuario.estado};
    const token = jwt.sign(payload,'123456', {expiresIn: '8h' });
    return token;
}

module.exports = {
    generarJWT
}