const mongoose = require('mongoose')

const sitesettingSchema = new mongoose.Schema({
    adminName : {
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
    logo : {
        type : String
    },
    createdOn : {
        type : Date
    },
    updatedOn : {
        type : Date
    },
    status : {
        type : Number
    },
    id : {
        type : Number
    }
})

module.exports = mongoose.model('sitesetting',sitesettingSchema)