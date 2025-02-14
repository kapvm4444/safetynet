const User = require('./../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

const filterBody = (doc, ...excludingFields) => {
  excludingFields.forEach((el) => delete doc[el]);
  return doc;
};

//=>
// me - get the user info
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

//=>
// updateMe - update the user info (by user)
exports.updateMe = catchAsync(async (req, res, next) => {
  //filter out unwanted parts
  const filteredBody = filterBody(
    req.body,
    'role',
    'password',
    'passwordConfirm',
  );

  //update the data
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

//=>
// get one user detail
exports.getUser = factory.getOne(User);

//=>
// get all users details
exports.getUsers = factory.getAll(User);

//=>
// get one user detail
exports.updateUser = factory.updateOne(User);

//=>
// get one user detail
exports.deleteUser = factory.deleteOne(User);
