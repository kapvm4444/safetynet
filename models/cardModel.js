const mongoose = require('mongoose');
const emergencyCardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 64,
    },
    description: String,
    department: {
      type: [String],
      enum: ['police', 'medical', 'fire', 'women-safety', 'animal-safety'],
      required: [true, 'Please specify emergency department'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      // required: [true, 'Card must belong to a user'],
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

const Card = mongoose.model('Card', emergencyCardSchema);
module.exports = Card;
