const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "L'adresse mail existe deja"],
        trim: true,
        lowercase: true,
        required: 'Email address is required',
    },
    password: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

module.exports = User = mongoose.model('users', UserSchema)