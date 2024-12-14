const { Schema, Mongoose, default: mongoose, model } = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true })

userSchema.pre('save', async function(next){
    if(!this.isModified) next();

    let hash =  await bcrypt.hash(this.password, 10);

    this.password = hash;
})

const User = model('User', userSchema);

module.exports = User;