import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    id:{type:String},
    title:{type:String,required:true},
    description:{type:String,required:true},
    assignedTo:{type:String,required:true},
    dueDate:{type:String,required:true},
    priority:{type:String,required:true},
    status:{type:String,required:true},
});

export default mongoose.model('tasks', taskSchema);