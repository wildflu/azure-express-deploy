
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const prodSchema = new Schema({
    name:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    price:{
        type: Number,
        require:true
    },
    image:{
        type: String,
        require:true
    },
})

const prodModel = mongoose.model('Prod', prodSchema);
module.exports = prodModel;