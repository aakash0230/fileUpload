const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    resume : {
        type : String,
        required : true
    }
});

const Information = new mongoose.model('info', infoSchema);

module.exports = Information;