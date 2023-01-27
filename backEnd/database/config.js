const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_CNN)
        mongoose.set('strictQuery', false)

        console.log(`The DB is Online!!!!!`);


    } catch (error) {
        console.log(error);
        throw new Error('Error to start the DB mongo');
    }


}


module.exports = {
    dbConnection
}