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
    },
    userName:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
})

//signup method 
userSchema.statics.signup = async function(email, password, userName, phone){
    //validate inputs
    if(!email || !password || !userName || !phone){
        throw Error('please enter all the fields')
    }
    if(validator.isEmail(email) == false){ // Validate email
        throw Error('Invalid email format')
    }
    if (!validator.isLength(password, { min: 8 })) { // Validate password
        throw new Error('Password must be at least 8 characters long');
    }
    if (!validator.matches(password, /[A-Z]/)) {
        throw new Error('Password must contain at least one uppercase letter');
    }
    if (!validator.isMobilePhone(phone, 'any')) {  // Validate phone number
        throw new Error('Invalid phone number');
    }
    const check = await this.findOne({email})
    if(check){
        throw Error('email already exists, sign up failed')
    }
    const phoneExists = await this.findOne({ phone });
    if (phoneExists) {
        throw new Error('Phone number already exists');
    }

    //hashing the password using bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.create({email, password: hashedPassword, userName, phone})
    return user
}


module.exports = mongoose.model('User', userSchema);