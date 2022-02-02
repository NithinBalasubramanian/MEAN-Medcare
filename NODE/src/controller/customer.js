const express = require('express');
const router = express.Router();
const customer = require('../model/customer')


// Fetch customer data

router.get('/getCustomerData',(req,res) => {

    customer.find({ status : 1}).sort({ createdOn : -1 })
        .then((data) => { 
            // console.log('data',data);
            let sendData = {
                data : data,
                msg : 'Fetched successfully',
                status : 200
            }

            res.json(sendData);
        })
        .catch((error) => { 
            console.log('error',error);
            let sendData = {
                data : [],
                msg : 'Something went wrong',
                status : 400
            }

            res.json(sendData);
        })
})

// fetch deleted customer data

router.get('/getDeletedCustomerData',(req,res) => {

    customer.find({ status : 0}).sort({ createdOn : -1 })
        .then((data) => { 
            // console.log('data',data);
            let sendData = {
                data : data,
                msg : 'Fetched successfully',
                status : 200
            }

            res.json(sendData);
        })
        .catch((error) => { 
            console.log('error',error);
            let sendData = {
                data : [],
                msg : 'Something went wrong',
                status : 400
            }

            res.json(sendData);
        })
})

// Add customer data

router.post('/addCustomer',(req,res) => {

    let data = req.body;

    let CustomerNew = new customer({
        name : data.name.toLowerCase(),
        company_name : data.company_name,
        contact : data.contact,
        email : data.email,
        address : data.address,
        debit : data.debit,
        createdOn : new Date(),
        updatedOn : '',
        status : 1
    });

    CustomerNew.save((error) => {
        if(error){
            console.log(error);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Customer saved successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})

// Fetch customer data by id

router.get('/fetchCustomer/:id',(req,res) => {

    let id = req.params.id;

    customer.find({ _id : id })
        .then((data) => { 
            let sendData = {
                data : data,
                msg : 'Fetched successfully',
                status : 200
            }

            res.json(sendData);
        })
        .catch((error) => { 
            console.log('error',error);
            let sendData = {
                data : [],
                msg : 'Something went wrong',
                status : 400
            }

            res.json(sendData);
        })
})

// Update customer data

router.put('/updateCustomer/:id',(req,res) => {

    let id = req.params.id;

    let data = req.body;

    let updateData = {
        name : data.name.toLowerCase(),
        company_name : data.company_name,
        contact : data.contact,
        email : data.email,
        address : data.address,
        debit : data.debit,
        updatedOn : new Date()
    };

    customer.findByIdAndUpdate(id,{$set:updateData},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Customer updated successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})


// Delete customer data

router.get('/deleteCustomer/:id',(req,res) => {

    let id = req.params.id;

    let data = {
        status : 0
    }

    customer.findByIdAndUpdate(id, {$set:data},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Customer deleted successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})

// Retain customer data

router.get('/retainCustomer/:id',(req,res) => {

    let id = req.params.id;

    let data = {
        status : 1
    }

    customer.findByIdAndUpdate(id, {$set:data},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Customer retained successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})


// Filter by search 

router.post('/searchCustomer',(req,res) => {

    let value = req.body.search.toLowerCase();
    let status = req.body.status

    let findData = {
        name : { $regex: '.*' + value + '.*' },
        status : status
    }

    customer.find(findData)
        .then((data) => { 
            // console.log('data',data);
            let sendData = {
                data : data,
                msg : 'Fetched successfully',
                status : 200
            }

            res.json(sendData);
        })
        .catch((error) => { 
            console.log('error',error);
            let sendData = {
                data : [],
                msg : 'Something went wrong',
                status : 400
            }

            res.json(sendData);
        })
})

module.exports = router