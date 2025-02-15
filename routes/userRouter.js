const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const cardRouter = require('./../routes/cardRouter');

const router = express.Router();

//nested routes
router.use('/:userId/cards', cardRouter);

//User routes
//=>
// signup
router.route('/signup').post(authController.signup);

//=>
// Login
router.route('/login').post(authController.login);

// router.use(authController.protect);

//=>
// Get user info (me)
router.route('/me').get(userController.getMe, userController.getUser);

//=>
// update the user details ( for logged in users)
router.route('/update-info').patch(userController.updateMe);

//=>
// change password
router.route('/change-password').patch(authController.changePassword);

//User Routes for super admin
//=>
// getting the details for all the users
router
  .route('/')
  .get(authController.restrictTo('super-admin'), userController.getUsers);

//=>
// manipulate users
router
  .route('/:id')
  .get(authController.restrictTo('super-admin'), userController.getUser)
  .patch(
    /*authController.restrictTo('super-admin'),*/ userController.updateUser,
  )
  .delete(authController.restrictTo('super-admin'), userController.deleteUser);

//=>
// create another admin or operator
router
  .route('/create/:role')
  .post(
    authController.restrictTo('super-admin', 'admin'),
    authController.setRole,
    authController.createOfficer,
  );

module.exports = router;
