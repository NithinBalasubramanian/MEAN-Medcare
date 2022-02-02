const express = require('express');
const employee = require('../model/employee');
const router = express.Router();
const employeeType = require('../model/employeeType')


//employee type management

router.post('/addEmployeeType',(req,res) => {

    let data = req.body

    let employeeTypeNew = new employeeType({
        title : data.type,
        createdOn : new Date(),
        status : 1
    })

    employeeTypeNew.save((error) => {
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
                msg : 'Employee type saved successfully'
            }
            res.json(sendData)
        }
    })
})

router.get('/getEmployeetype',(req,res) => {

    employeeType.find({ status : 1}).sort({ createdOn : -1 })
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

//employee management

router.get('/getEmployee',(req,res) => {

    employee.find({ status : 1 }).sort({ createdOn : -1 })
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

// fetch releaved employee data

router.get('/getReleavedEmployee',(req,res) => {

    employee.find({ status : 0}).sort({ createdOn : -1 })
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

router.post('/addEmployeeData',(req,res) => {

    let data = req.body

    let newEmployee = new employee({
        name : data.name.toLowerCase(),
        type : data.type,
        contact : data.contact,
        email : data.email,
        address : data.address,
        salary : data.salary,
        joinedOn : data.joinedDate,
        leftOn : '',
        createdOn : new Date(),
        updatedOn : '',
        status : 1
    })

    newEmployee.save((error) => {
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
                msg : 'Employee saved successfully'
            }
            res.json(sendData)
        }
    })
})

// Update employee data

router.put('/updateEmployee/:id',(req,res) => {

    let id = req.params.id;

    let data = req.body;

    let updateData = {
        name : data.name.toLowerCase(),
        type : data.type,
        contact : data.contact,
        email : data.email,
        address : data.address,
        salary : data.salary,
        joinedOn : data.joinedDate,
        updatedOn : new Date(),
    };

    employee.findByIdAndUpdate(id,{$set:updateData},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Employee updated successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})



// Fetch employee data by id

router.get('/fetchEmployee/:id',(req,res) => {

    let id = req.params.id;

    employee.find({ _id : id })
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


// Delete employee data

router.get('/deleteEmployee/:id',(req,res) => {

    let id = req.params.id;

    let data = {
        leftOn : new Date(),
        status : 0
    }

    employee.findByIdAndUpdate(id, {$set:data},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Employee removed successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})

// Retain employee data

router.get('/retainEmployee/:id',(req,res) => {

    let id = req.params.id;

    let data = {
        leftOn : '',
        status : 1
    }

    employee.findByIdAndUpdate(id, {$set:data},(err,docs) => { 
        if(err){
            console.log(err);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Employee retained successfully',
                status : 200
            }
            res.json(sendData);
        }
    })
})

// Filter by search 

router.post('/searchEMployee',(req,res) => {

    let value = req.body.search.toLowerCase();
    let status = req.body.status

    let findData = {
        name : { $regex: '.*' + value + '.*' },
        status : status
    }

    employee.find(findData)
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