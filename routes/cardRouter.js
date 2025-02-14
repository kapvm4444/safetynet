const express = require('express');

const cardController = require('./../controllers/cardController');
const { protect } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// router.use(protect);

//api/v1/user/:userid/cards
router
  .route('/')
  //=>
  // Getting all the cards
  .get(cardController.getCards)
  //=>
  // Create Card
  .post(cardController.createCard);

router
  .route('/:id')
  //=>
  // get one card
  .get(cardController.getCard)
  //=>
  // update card detail
  .patch(cardController.updateCard)
  //=>
  // delete card
  .delete(cardController.deleteCard);

module.exports = router;
