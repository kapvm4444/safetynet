const express = require('express');
const requestController = require('./../controllers/requestController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  //get all the request
  .get(requestController.getRequests)
  //generate a request
  .post(requestController.createRequest);

router
  .route('/:id')
  //get single request data
  .get(requestController.getRequest)
  //update the details on a request
  .patch(requestController.updateRequest)
  //delete the request
  .delete(requestController.deleteRequest);

router
  .route('/:id/resolve')
  .patch(
    authController.restrictTo('operator', 'admin'),
    requestController.resolve,
  );

module.exports = router;
