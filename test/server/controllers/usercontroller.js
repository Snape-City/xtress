const User = mongoose.model('User')

  createUser = (req, res, next ) => {
    let userData = {
      username: testBoy,
      password: testboyPW
    }
    
    User.create(userData, function(err, user) {
      if (err) {
        return next(err);
      }
    })
  }

  fibonacci = (num) => {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
  }

  module.exports = { fibonacci, createUser }