const showDevErr = (err, res) => {
  res.status(err.statusCode).json({
    status: `${err.statusCode.startsWith('4') ? 'fail' : 'error'}`,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const showProdErr = (err, res) => {
  res.status(err.statusCode).json({
    status: `${err.statusCode.startsWith('4') ? 'fail' : 'error'}`,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') showDevErr(err, res);
  else if (process.env.NODE_ENV === 'production') showProdErr(err, res);

  next();
};
