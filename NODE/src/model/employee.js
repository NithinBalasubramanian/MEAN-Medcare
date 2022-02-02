const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    type : {
        type : String,
        require : true
    },
    contact : {
        type : String,
        require : true
    },
    email : {
        type : String
    },
    address : {
        type : String
    },
    salary : {
        type : Number
    },
    joinedOn : {
        type : Date,
        require : true
    },
    leftOn : {
        type : Date
    },
    createdOn : {
        type : Date
    },
    updatedOn : {
        type : Date
    },
    status : {
        type : Number
    }
})

module.exports = mongoose.model('employee',employeeSchema)