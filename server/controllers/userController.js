const User = require('../models/UserModel');


//login 
const loginProcess = async (req, res) => {
    res.json({mssg: 'login successfully'})

}


//signup
const signupProcess = async (req, res) => {
    const {email,password} = req.body
    try{
        const newUser = await User.signup(email, password)
        res.status(200).json({email, newUser})

    }
    catch(error){
        res.status(400).json({error: error.message})

    }
}

module.exports = {
    loginProcess,
    signupProcess,
}