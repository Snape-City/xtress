const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

SALT_WORK_FACTOR = 10;

const UserSchema = new Schema ({
  username: { type: String, required: true },
  password: { type: String, required: true}
});

// Hash users password with bcrypt
UserSchema.pre('save', (next) => {
  let user = this;
  if (!user.isModified('password')) return next();
  //generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    //hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      //override the cleartext password wit hthe hashed one
      user.password = hash;
      next();
    })
  })
});

// Password Verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  })
};

module.exports = mongoose.model('User', UserSchema);
