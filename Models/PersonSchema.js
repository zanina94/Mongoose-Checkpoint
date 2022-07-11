const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const PersonSchema = new Schema({
    name : { 
        type : String,
        required : true
    },
    age : Number,
    favouriteFoods :[{
        type: String
    }]
    
}, { versionKey: false })

module.exports = mongoose.model('Person',PersonSchema)