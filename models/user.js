const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    Username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    uid:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    address:{type:Array,required:false},
    phone:{type:String,required:false},
    userType:{type:String,required:true,default:"client",enum:['Admin','Driver','Client','Vendour']},
    profile:{type:String,required:true,default:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2014%2F02%2F27%2F16%2F10%2Fflowers-276014_640.jpg&tbnid=UqPndDmv-D11RM&vet=12ahUKEwjRn9Xn0K-DAxX_amwGHfA9AjoQMygHegQIARBk..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&docid=Ba_eiczVaD9-zM&w=640&h=407&q=picture&ved=2ahUKEwjRn9Xn0K-DAxX_amwGHfA9AjoQMygHegQIARBk'},
},
{timestamps:true}

);

module.exports=mongoose.model('user',UserSchema)