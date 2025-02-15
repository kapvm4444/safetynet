const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const cardRouter = require('./routes/cardRouter');
const userRouter = require('./routes/userRouter');
const requestRouter = require('./routes/requestRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

//third-party middlewares for utilities
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//static files like images
app.use(express.static(`${__dirname}/public`));

//cookie parser
app.use(cookieParser());

//json body parser
app.use(express.json({ limit: '10kb' }));

//get the data from forms
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//sanitize the data (when someone try to get access without entering proper email and password)
app.use(mongoSanitize());

//block XSS (cross-site scripting attacks)
app.use(xss());

// block http parameters pollutions (hpp) [when someone try to give multiple same parameters in URL]
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'ratingsQuantity',
      'difficulty',
      'price',
    ],
  }),
);

app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/requests', requestRouter);

app.all('*', (req, res) => {
  res.end(
    'Wow!, looks like you are lost.\nDownload the SafetyNet from PlayStore',
  );
});

app.use(globalErrorHandler);

module.exports = app;
