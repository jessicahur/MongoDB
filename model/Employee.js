const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
  name: {type: String, required: true},
  username: {type: String, require: true},
  DOB: {type: Date, required: true},
  address: {type: String, require: true},
  phone: {
    type: String,
    require: true,
    validate: {
      validator: function(value) {
        return /[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(value);
      },
      message: '{VALUE} is not a valid phone number!'
    }
  },
  email: {
    type: String,
    require: true,
    validate: {
      validator: function(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  position: {type: String, require: true},
  manager: {type: Schema.Types.ObjectId, ref: 'Employee'}
});

module.exports = mongoose.model('Employee', Employee);
