import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age not valid')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},  {
    timestamps: true
});

userSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'scorerDevApp');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.pre('save', async function (next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
      const user = await User.findOne({ email });
      if(!user) {
          throw new Error('Unable to login');
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
          throw new Error('Unable to login');
      }
      return user;
};

const User = mongoose.model('user', userSchema);

export default User;
