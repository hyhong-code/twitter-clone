require('dotenv').config({ path: `${__dirname}/config.env` });
const fs = require('fs');
const connectDB = require('./db');
// Import Model......

// Connect to DB
connectDB();

// Read data here......

// Import data to DB
const importData = async () => {
  try {
    // Model.create()......
    console.log('Data imported...');
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

// Delete data from DB
const destroyData = async () => {
  try {
    // Model.deleteMany()......
    console.log('Data destroyed...');
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

// Controls
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
