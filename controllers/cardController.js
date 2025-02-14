const Card = require('./../models/cardModel');
const factory = require('./handlerFactory');

//get all the cards
exports.getCards = factory.getAll(Card);

//get one specific card
exports.getCard = factory.getAll(Card);

//get user specific cards
// exports.getUserCards

//create card
exports.createCard = factory.createOne(Card);

//update card details
exports.updateCard = factory.updateOne(Card);

//delete card
exports.deleteCard = factory.deleteOne(Card);
