import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {IUserModel, IUserSchema} from '../types/user';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator (value: number) {
                if(value < 0) {
                    return false
                }
            },
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (value: string) {
                if(!validator.isEmail(value)) {
                    return false
                }
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate: {
            validator: function (value: string) {
                if(value.toLowerCase().includes('password')) {
                    return false
                }
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
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'scorerDevApp');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.pre('save', async function (next) {
    const user = this;
    const userObject = user.toObject();

    if(userObject.isModified('password')) {
        userObject.password = await bcrypt.hash(userObject.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email: string, password: string) => {
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

const User = mongoose.model<IUserModel, IUserSchema>('user', userSchema);

export default User;
