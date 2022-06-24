const mongoose = require('mongoose');
let uuidv1 = require('uuidv1');
const { createHmac } = await import('node:crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

userSchema.virtual('password')
.set(function(password){
    // create temporary variable
    this._password = password;
    // generate timestamp
    this.salt = uuidv1()
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
})

userSchema.methods = {
    encryptPassword: function(password){
        if (!password) return "";
        try{
            return createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
        }
        catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);