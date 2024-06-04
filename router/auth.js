/*
    path: api/login
*/
const {Router} = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// create new users
router.post('/new',[
    check('name','The name is mandatory').not().isEmpty(),
    check('password','The password is mandatory').not().isEmpty(),
    check('email','The email is mandatory').isEmail(),
    validateFields
],createUser);

// Login
router.post('/', [
    check('email','The email is mandatory').isEmail(),
    check('password','Incorrect Password').not().isEmpty(),
    validateFields
],login)

// Revalidate token
router.get('/renew',validateJWT,renewToken)

module.exports = router;