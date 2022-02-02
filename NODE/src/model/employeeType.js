const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    status : {
        type : Number
    },
    createdOn : {
        type : Date
    }
})

module.exports = mongoose.model('employeeType' , employeeSchema)