const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },
  Email: {
    type: String,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
})

//authenticate input against database
UserSchema.statics.authenticate = function (Username, Password, callback) {
  User.findOne({ Username: Username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(Password, user.Password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.Password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.Password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;