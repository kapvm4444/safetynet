const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'User must have full name'],
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'email is invalid'],
      unique: [true, 'email is already in use'],
      required: [true, 'User must provide an Email'],
      lowercase: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'User must be born before today'],
    },
    password: {
      type: String,
      min: 8,
      max: 64,
      required: [true, 'Password is required'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      min: 8,
      max: 64,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: 'Password and Password Confirm must be same',
      },
      select: false,
    },
    address: String,
    mobile: {
      type: Number,
      required: [true, 'please provide your mobile number'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Please specify your gender'],
    },
    adhaar: {
      type: Number,
      // required: [true, 'adhaar card number must be provided'],
      // unique: [true, 'adhaar card number already in use'],
    },
    emergencyContact: {
      type: [
        new mongoose.Schema({
          name: String,
          mobile: Number,
        }),
      ],
    },
    blood: {
      type: String,
      enum: ['a+', 'b+', 'ab+', 'o+', 'ab-', 'b-', 'a-', 'o-'],
    },
    pastDisease: String,
    role: {
      type: String,
      enum: ['user', 'super-admin', 'admin', 'operator'],
      select: false,
    },
    department: {
      type: String,
      enum: ['police', 'medical', 'fire', 'women-safety', 'animal-safety'],
    },
    photo: {
      type: String,
      default: 'default.jpeg',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    PasswordResetExpire: {
      type: Date,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//virtual field
userSchema.virtual('age').get(function () {
  return Date.now() - this.dateOfBirth;
});

//label
// Hooks
//=>
// Encrypt the password (pre hook)
userSchema.pre('save', async function (next) {
  //check if password is changed or not
  if (!this.isModified('password')) return next();

  //encrypt the password
  this.password = await bcrypt.hash(this.password, 10);

  this.passwordComfirm = undefined;

  next();
});

//=>
// set the password changed time (post hook)
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordConfirm = undefined;
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//Label
// Instance methods
//=>
// check both passwords
userSchema.methods.checkPassword = async function (
  userPassword,
  candidatePassword,
) {
  return await bcrypt.compare(userPassword, candidatePassword);
};

//=>
// check is password is changed after token is issues or not
userSchema.methods.isPasswordChangedAfter = function (JWTTokenIssueTime) {
  if (this.passwordChangedAt) {
    const passwordChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
    );

    return passwordChangeTime > JWTTokenIssueTime;
  }

  return false;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
