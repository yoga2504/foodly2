const User = require('../models/user')

module.exports = {
    getUser:async (req,res) => {
        const userId = req.user.id
        try{
            const user = await User.findById({_id:userId},{password: 0,_v:0, createdAt:0, updatedAt:0})
            res.status(200).json(user)
        }catch(error){
            res.status(500).json({message:'error retrieving user',error:error.message})
        }
    },

    deleteUser:async (req,res) => {
        const userId = req.user.id
        try{
           await User.findByIdAndDelete(userId)
            res.status(200).json({status:true,message:"user deleted succcessfully"})
        }catch(error){
            res.status(500).json({message:'error deleting user'})
        }
    },

    updateUser:async (req,res) => {
        const userId = req.user.id
        try{
            await User.findByIdAndUpdate(userId,{
                $set: req.body
            },{new:true})
            res.status(200).json({status:true,message:"user updated succcessfully"})
        }catch(error){
            res.status(500).json({message:'error updating user'})
        }
    }
}