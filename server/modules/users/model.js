import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

let validateEmail = (email) => {
  return (/\S+@\S+\.\S+/).test(email);
}

// fullName: {
//   type: String,
//   required: true,
// },
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

UserSchema.pre('save', function(next) {
  debugger
  console.log(">>>>>>>>>>>>>>>>>");
  let user = this;
  if (user.isNew || user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt) {
      if(err) {return next(err)}
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) {return next(err)}
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) {return callback(err)}
    callback(null, isMatch);
  });
}

export default mongoose.model('User', UserSchema);
