const Card = require('./../models/cardModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const ApiFeature = require('../utils/apiFeature');

//get all the cards
exports.getCards = factory.getAll(Card);

//get one specific card
exports.getCard = factory.getOne(Card);

//get user specific cards
exports.getUserCards = catchAsync(async (req, res, next) => {
  const features = new ApiFeature(
    req.query,
    Card.find({
      user: req.user.id,
    }),
  )
    .filter()
    .selectFields()
    .sort()
    .paginate();

  const docs = await features.query;

  res.status(200).json({
    status: 'success',
    length: docs.length,
    data: {
      docs,
    },
  });
});

//create card
exports.createCard = factory.createOne(Card);

//update card details
exports.updateCard = factory.updateOne(Card);

//delete card
exports.deleteCard = factory.deleteOne(Card);
