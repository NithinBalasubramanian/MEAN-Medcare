const express = require('express');
const Supplier = require('../model/supplier');
const router = express.Router();



//Supplier management

router.get('/getSupplier',(req,res) => {

    Supplier.find({ status : 1 }).sort({ createdOn : -1 })
        .then((data) => {
            let sendData = {
                status : 200,
                msg : 'Data fetched successfully',
                data : data
            }

            res.json(sendData)
        })
        .catch((error) => {
            let sendData = {
                status : 400,
                msg : 'Something went wrong',
                data : error
            }

            res.json(sendData)
        })

})

// fetch removed Supplier data

router.get('/getRemovedSupplier',(req,res) => {

    Supplier.find({ status : 0}).sort({ createdOn : -1 })
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

router.post('/addSupplierData',(req,res) => {

    let data = req.body

    let newSupplier = new Supplier({
        name : data.name.toLowerCase(),
        companyName : data.companyName,
        contact : data.contact,
        email : data.email,
        address : data.address,
        debit : data.debit,
        includedOn : data.includedDate,
        leftOn : '',
        createdOn : new Date(),
        updatedOn : '',
        status : 1
    })

    newSupplier.save((error) => {
        if(error){
            let sendData = {
                status : 400,
                error : error,
                msg : 'something went wrong'
            }
            res.json(sendData)
        }else{
            let sendData = {
                status : 200,
                msg : 'Supplier saved successfully'
            }
            res.json(sendData)
        }
    })
})

// Update Supplier data

router.put('/updateSupplier/:id',(req,res) => {

    let id = req.params.id;

    let data = req.body;

    let updateData = {
        name : data.name.toLowerCase(),
        companyName : data.companyName,
        contact : data.contact,
        email : data.email,
        address : data.address,
        debit : data.debit,
        includedOn : data.includedDate,
        updatedOn : new Date(),
    };

    Supplier.findByIdAndUpdate(id,{$set:updateData},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Supplier updated successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})



// Fetch Supplier data by id

router.get('/fetchSupplier/:id',(req,res) => {

    let id = req.params.id;

    Supplier.find({ _id : id })
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


// Delete Supplier data

router.get('/deleteSupplier/:id',(req,res) => {

    let id = req.params.id;

    let data = {
        leftOn : new Date(),
        status : 0
    }

    Supplier.findByIdAndUpdate(id, {$set:data},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Supplier removed successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})

// Retain Supplier data

router.get('/retainSupplier/:id',(req,res) => {

    let id = req.params.id;

    let data = {
        leftOn : '',
        status : 1
    }

    Supplier.findByIdAndUpdate(id, {$set:data},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Supplier retained successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})

// Filter by search 

router.post('/searchSupplier',(req,res) => {

    let value = req.body.search.toLowerCase();
    let status = req.body.status

    let findData = {
        name : { $regex: '.*' + value + '.*' },
        status : status
    }

    Supplier.find(findData)
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