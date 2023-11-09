const mongoose = require('mongoose')
const Schema = mongoose.Schema
const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('student', studentSchema)

// {
//   "_id": "654b2c6237105c8d927e77b2",
  // "username": "tebohomolise",
  // "name": "Teboho",
  // "surname": "Molise",
  // "email": "tebohomolise32@gmail.com",
  // "password": "tebomolise12345",
//   "createdAt": "2023-11-08T06:36:18.524Z",
//   "updatedAt": "2023-11-08T06:37:44.825Z",
//   "__v": 0
// }