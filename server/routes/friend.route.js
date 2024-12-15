const express = require('express');
const {getAllFriend , addFriend, acceptRequest} = require('../controllers/friend.controller');
const {auth} = require('../controllers/auth.controller')

const router = express.Router();


router.get('/getAllFriend',auth,getAllFriend);
router.post('/addFriend',auth,addFriend);
router.post('/acceptRequest',auth,acceptRequest)


module.exports = router;