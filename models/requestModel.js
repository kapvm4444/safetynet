const mongoose = require('mongoose');
const sendEmail = require('./../utils/email');
const User = require('./userModel');

const requestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    department: {
      type: [String],
      enum: ['police', 'medical', 'fire', 'women-safety', 'animal-safety'],
      required: [true, 'Please specify emergency department'],
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
    description: String,
    resolved: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

requestSchema.pre('save', async function (next) {
  const user = await User.findById(this.user);
  sendEmail(user);
  next();
});

requestSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v',
  });

  next();
});

const requestModel = mongoose.model('Request', requestSchema);

module.exports = requestModel;
