const dotenv = require('dotenv');

//Handling syntax errors
process.on('uncaughtException', (error) => {
  console.log(`SYNTAX ERROR 🛠`);
  console.log(`${error.name} => ${error.message}`);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/.env` });
const app = require('./app');
const mongoose = require('mongoose');

//MongoDB database connection String
const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

//mongoDB connection
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Cloud Database Connected');
  });

const port = process.env.PORT || 3000;
const index = app.listen(port, () => {
  console.log(`API is running on http://127.0.0.1:${port}`);
});

//Unhandled rejection - means some errors that might be happened at run time
process.on('unhandledRejection', (error) => {
  console.log(`UNHANDLED REJECTION 💥`);
  console.log(`${error.name} => ${error.message}`);
  console.log(error.stack);
  index.close(() => {
    process.exit(1);
  });
});
