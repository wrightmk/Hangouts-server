import User from './model';
import jwt from 'jwt-simple';
import config from '../../config/config'




// User creates hangouts for now

function tokenForUser(user) {
console.log('User', user);
  let timestamp = new Date().getTime();

  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret);
  console.log('jwt', jwt);
}

exports.signin = function(req, res, next) {
  let user = req.user;
  res.send({token: tokenForUser(user), user_id: user._id});
}

exports.signup = function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  if(!email || !password) {
    return res.status(422).json({error: "You must provide an email and a password"});
  }

  //check if user already exists, send error if they do

  User.findOne({email: email}, function(err, existingUser) {
    if(err) {return next(err)}
    if(existingUser) {
      return res.status(422).json({error: "Email taken"}
    )}
    let user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) {return next(err)}
      res.json({user_id: user._id, token: tokenForUser(user)});
    });
  });
}
