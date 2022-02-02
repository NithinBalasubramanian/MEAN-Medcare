const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const controller = require('./controller/index.js')

const app = express();

app.use('/uploads',express.static(process.cwd() + '/uploads'));

const PORT = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.get("/",(req,res) => {
    res.send('Server started');
});

//routes

app.use('/api/customer/',controller.customer)
app.use('/api/employee/',controller.employee)
app.use('/api/sitesetting/',controller.sitesetting)
app.use('/api/supplier',controller.supplier)

//mongodb

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/medcare',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

mongoose.connection.on('connected',()=>{
    console.log('connected db');
});

app.listen(PORT,console.log(`Server started at port ${PORT}`))



