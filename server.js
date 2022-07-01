require('dotenv').config();
const express = require('express')
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Task=require('./Model/task');
const app = express()

// setting view engines and middlewares
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// DataBase connection
// Listening to requests after connection;
mongoose.connect(process.env.DB_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('listening to requests');
            console.log('connected to db')
        })
    })
    .catch((err)=>console.log(err));


// ROUTES
app.get('/',(req,res)=>{
    Task.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('task',{tasks:result});
    })
    .catch(err=>console.log(err));
})

app.post('/',async(req,res)=>{
    const{task}=req.body;
    try {
        const newTask=await Task.create({task});
        res.status(201).json(newTask);
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})
app.use((req,res)=>{
    res.send('404 page');
})