import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    id:{type:String}
});

export default mongoose.model('users', userSchema);