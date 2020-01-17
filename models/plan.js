let mongoose = require('mongoose');

// plan Schema
let planSchema = mongoose.Schema({
   name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    nr:{
        type: String,
        required: true
    },
    date:{
        type:String,
        required: true
    }
});

let Plan = module.exports = mongoose.model('Plan', planSchema);