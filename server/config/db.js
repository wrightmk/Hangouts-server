import mongoose from 'mongoose';

import DB_KEY from './app_keys'

// console.log(DB_KEY);

export default () => {
  mongoose.Promise = global.Promise;

  mongoose.connect(`${DB_KEY}`);
  // mongoose.connect(`mongodb://localhost/awesome-meetup`);
  mongoose.connection
  .once('open', () => console.log('mongodb is running'))
  .on('error', err => console.error(err))
};
