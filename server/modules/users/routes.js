const passport = require('passport');

import {Router} from 'express'
import * as UserController from './controller';
const passportService = require('./passport');

let requireAuth = passport.authenticate('jwt', {session: false});
let requireLogin = passport.authenticate('local', {session: false});

const routes = new Router();

// Auth routes ------------------------

routes.post('/signup', UserController.signup);

routes.post('/signin', [requireLogin,UserController.signin]);

// function protected2(req, res, next) {
//   res.send("heres the secret bitch")
// }
//
// routes.get('/protected2', requireAuth, protected2)

export default routes;
