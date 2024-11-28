const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/person')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const users = [
    { name: 'John Doe', Age: 28, Gender: 'male', Mobile_number: 9876543210 },
    { name: 'Jane Smith', Age: 32, Gender: 'female', Mobile_number: 9123456789 },
    { name: 'Michael Brown', Age: 45, Gender: 'male', Mobile_number: 9988776655 },
    { name: 'Emily Davis', Age: 25, Gender: 'female', Mobile_number: 9786452310 },
    { name: 'Chris Wilson', Age: 36, Gender: 'male', Mobile_number: 9654321789 },
    { name: 'Sarah Johnson', Age: 29, Gender: 'female', Mobile_number: 9543216780 },
    { name: 'David Martinez', Age: 50, Gender: 'male', Mobile_number: 9123567890 },
    { name: 'Olivia Taylor', Age: 21, Gender: 'female', Mobile_number: 9645218730 },
    { name: 'Ethan Lewis', Age: 40, Gender: 'male', Mobile_number: 9456723891 },
    { name: 'Sophia Walker', Age: 27, Gender: 'female', Mobile_number: 9783245160 },
  ];

  User.insertMany(users)
  .then(res => {
      console.log(res)
  })
  .catch(e => {
      console.log(e)
  })