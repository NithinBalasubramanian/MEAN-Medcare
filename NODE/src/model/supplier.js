const mongoose = require('mongoose')

const SupplierSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    }, 
    company_name : {
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
    debit : {
        type : Number
    },
    includedOn : {
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

module.exports = mongoose.model('Supplier',SupplierSchema)