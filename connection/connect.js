const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/apptunix_test", {
            useCreateIndex: true,
            useFindandModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DATABSE CONNECTED SUCCESSFULLY');
    }
    catch (error) {
        console.log(`couldn't connect to database:`, error);
    }
}