import mongoose from 'mongoose';


export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/awesome-meetup');
  mongoose.connection
  .once('open', () => console.log('mongodb is running'))
  .on('error', err => console.error(err))
};
