const express = require('express');
const {findUser,auth,me} = require('../controllers/auth.controller')

const router = express.Router();

router.post('/findUser',auth,findUser)
router.get('/me',auth,me);


module.exports = router