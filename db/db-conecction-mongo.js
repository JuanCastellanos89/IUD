const mongoose = require('mongoose');

const getConnection = async () => {

    try {
        const url = 'mongodb://jcastellanosIUD:mxBxUqaakWg0KTYr@ac-wmuxz1p-shard-00-00.o3zyyhl.mongodb.net:27017,ac-wmuxz1p-shard-00-01.o3zyyhl.mongodb.net:27017,ac-wmuxz1p-shard-00-02.o3zyyhl.mongodb.net:27017/inventarios_iud?ssl=true&replicaSet=atlas-f15idu-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);

        console.log('Conexion exitosa!!!');

    } catch (error) {
        console.log(error);
    }

}
module.exports = {
    getConnection,
}