const express = require('express');
const router = express.Router();
const sitesetting = require('../model/sitesetting')


const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , './uploads/')
    },
    filename : function( req , file , cb){
        cb(null , new Date().toISOString() + file.originalname)
    }
})

// const upload = multer({ dest : '../uploads'})

const upload = multer({ storage : storage})



router.post('/addSite', upload.single('logo'),(req,res) => {

    // console.log(req.file)

    let data = req.body;

    let file = req.file;

    let SiteSettingNew = new sitesetting({
        adminName : data.name.toLowerCase(),
        company_name : data.company_name,
        contact : data.contact,
        email : data.email,
        address : data.address,
        logo : file.filename,
        createdOn : new Date(),
        updatedOn : '',
        status : 1,
        id : 1,
    });

    SiteSettingNew.save((error) => {
        if(error){
            console.log(error);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Site setting saved successfully',
                status : 200
            }
            res.json(sendData);
        }
    })

})

router.put('/updateSite/:id', upload.single('logo'),(req,res) => {

    // console.log(req.file)

    let id = req.params.id;

    let data = req.body;

    let file = req.file;

    let siteUpdate = {
        adminName : data.name.toLowerCase(),
        company_name : data.company_name,
        contact : data.contact,
        email : data.email,
        address : data.address,
        logo : file.filename,
        updatedOn : new Date(),
    };

    sitesetting.findByIdAndUpdate(id,{$set:siteUpdate},(error) => {
        if(error){
            console.log(error);
            let sendData = {
                msg : 'Something went wrong',
                status : 400
            }
            res.json(sendData);
        }else{
            let sendData = {
                msg : 'Site setting updated successfully',
                status : 200
            }
            res.json(sendData);
        }
    })

})

router.get('/fetchSite', (req,res) => {

    sitesetting.find()
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




module.exports = router