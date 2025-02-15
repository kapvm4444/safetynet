const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

//NOTE
// Methods
//=>
// create JWT token
const createJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//=>
// send the jwt token to both cookies and with response object
const createSendToken = (user, statusCode, res) => {
  const token = createJWTToken(user._id);

  const cookieOptions = {
    httpOnly: true,
    // secure: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

//NOTE
// for normal User

//=>
// signup user (create account)
exports.signup = catchAsync(async (req, res, next) => {
  req.body.role = 'user';
  //filter the content
  const newUser = await User.create(req.body);
  //send the response
  createSendToken(newUser, 201, res);
});

//=>
// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //get the username or email and password and check it exist or not
  if (!email || !password)
    return next(new AppError('Please provide Email and Password Both', 400));

  //check if user exist or not
  const user = await User.findOne({ email }).select('+password');

  //if password or email is incorrect
  if (!user || !(await user.checkPassword(user.password, password)))
    return next(new AppError('Email or Password Incorrect', 400));

  //send the token and user object
  createSendToken(user, 200, res);
});

//=>
// protect content from non logged-in users
exports.protect = async (req, res, next) => {
  //check if authorization header exist or not
  let token;
  if (req.cookies.jwt) token = req.cookies.jwt;
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];

  //if header exist then check if token is valid or not
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //if token data(id) is valid then check user exist or not
  const currentUser = await User.findById(decode.id);
  if (!currentUser)
    return next(new AppError('User does not exist, please login again', 401));

  //if user exist check if he changed is password or not
  if (currentUser.isPasswordChangedAfter(decode.iat))
    return next(new AppError('Password is changed, please log in again', 401));

  //set the req.user
  req.user = currentUser;
  next();
};

//=>
// forgot-password from login page

//=>
// reset-password with a link sent to email

//=>
// change-password (when you know your password)
exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  //check if current password is correct or not
  const user = await User.findById(req.user._id).select('+password');
  if (!user)
    return next(new AppError('JWT malformed, please login again', 400));

  if (!user.checkPassword(user.password, currentPassword))
    return next(new AppError('current password is incorrect', 400));

  //check if password and passwordConfirm is correct or not
  //change the password
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  user.save();

  //generate new token (login again)
  createSendToken(user, 200, res);
});

//=>
// logout (for admins)
exports.logout = (req, res, next) => {
  res.cookie('jwt', 'logged Out', {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
};

//NOTE
// ADMIN AUTH

//=>
// restrictTo - restrict the content from normal or unauthorized users
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You are not authorizes to use this resource', 403),
      );

    next();
  };
};

//=>
// setting the role (for admin and super admin)
exports.setRole = (req, res, next) => {
  if (req.params.role) req.body.role = req.params.role;
  next();
};

//=>
// create new department admin (for super-admin only)
///api/v1/users/create-admin
exports.createOfficer = catchAsync(async (req, res, next) => {
  const user = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    address: req.body.address,
    mobile: req.body.mobile,
    gender: req.body.gender,
    pastDisease: req.body.pastDisease,
    role: req.body.role,
    department: req.body.department,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});
