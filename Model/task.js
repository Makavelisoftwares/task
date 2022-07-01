const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const taskSchema=new Schema({
    task:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    }
},{timestamps:true});

const Task=mongoose.model('task',taskSchema);
module.exports=Task;