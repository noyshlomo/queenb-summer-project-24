const mongoose = require('mongoose')
//npm install bcrypt - at the terminal 
//used for hashing the password.
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

//signup method 
userSchema.statics.signup = async function(email, password){
    //validate inputs
    if(!email || !password){
        throw Error('please enter all the fields')
    }
    if(validator.isEmail(email) == false){
        throw Error('Invalid email format')
    }
    if (!validator.isLength(password, { min: 8 })) {
        throw new Error('Password must be at least 8 characters long');
    }
    if (!validator.matches(password, /[A-Z]/)) {
        throw new Error('Password must contain at least one uppercase letter');
    }
    const check = await this.findOne({email})
    if(check){
        throw Error('email already exists, sign up failed')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.create({email, password: hashedPassword})
    return user
}


module.exports = mongoose.model('User', userSchema);