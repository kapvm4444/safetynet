const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const Card = require('../../models/cardModel');
const User = require('../../models/userModel');
// const Request = require('../../models/requestModel');

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log('Database Connection Successful'));

//READ JSON FILE
// const cards = JSON.parse(
//   fs.readFileSync(`${__dirname}/card-data.json`, 'utf-8'),
// );

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/user-data.json`, 'utf-8'),
);

// const requests = JSON.parse(
//   fs.readFileSync(`${__dirname}/request-data.json`, 'utf-8'),
// );

//=>
// Importing Tours from local file to cloud database
const importData = async () => {
  try {
    console.log(users.length);
    // console.log(cards.length);
    // console.log(requests.length);
    // console.log(users);
    await User.create(users, {
      validateBeforeSave: false,
    });
    // await Card.create(cards);
    // await Request.create(requests);

    console.log('data inserted successfully');
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

//=>
// Deleting Tours from cloud database
const deleteData = async () => {
  try {
    await User.deleteMany();
    // await Card.deleteMany();
    // await Request.deleteMany();

    console.log('data deleted successfully');
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
