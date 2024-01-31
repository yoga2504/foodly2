User = require('../models/user')
CryptoJS = require('crypto-js')
jwt=require('jsonwebtoken')
admin = require('firebase-admin')

module.exports = {
    CreateUser:async(req,res) => {
        const user = req.body;
        try{
            await admin.auth().getUserByEmail(user.email);

            res.status(400).json({message:"Email already used"})
        }catch(error){
            if(error.code =='auth/user-not-found')
            try{
                const userResponce = await admin.auth().createUser({
                    sername: user.username,
                    email: user.email,
                    password: CryptoJS.AES.encrypt(user.password, process.env.SECRET).toString(),
                    uid: userResponse.uid,
                    userType: 'Client' 
                })
            await newUser.save()
            res.status(201).json({ status: true })
        } catch (error) {
            res.status(500).json({ status: false, error: "Error creating user" })
        }
        }
    },
    loginUser: async(req,res) => {
        try{
            const user = await User.findOne({email: req.body.email }, { __v: 0, updatedAt: 0, createdAt: 0})
            !user && res.status(401).json("Wrong credentials")

            const decryptedpassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const decrypted = decryptedpassword.toString(CryptoJS.enc.Utf8);

            decrypted !== req.body.password && res.status(401).json("Wrong password")

            const userToken = jwt.sign({
                id: user._id, userType: user.userType, email: user.email,
            }, process.env.JWT_SEC, { expiresIn: '21d' });

            const { password, email, ...others } = user._doc;

            res.status(200).json({ ...others, userToken })

        } catch (error) {
            res.status(500).json({ status: false, error: error.message })
        }
    }
}
