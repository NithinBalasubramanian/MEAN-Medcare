const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    company_name : {
        type : String
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

module.exports = mongoose.model('customer',customerSchema)