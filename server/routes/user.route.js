const express = require('express');
const {findUser,auth,me} = require('../controllers/auth.controller')
const {putDescription} = require('../controllers/user.controller')

const router = express.Router();

router.post('/findUser',auth,findUser)
router.get('/me',auth,me);
router.post('/putDescription',auth,putDescription);


module.exports = router