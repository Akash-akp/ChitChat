const express = require('express');
const {getAllFriend , addFriend, acceptRequest,getAllFriendRequest,removeFriend} = require('../controllers/friend.controller');
const {auth} = require('../controllers/auth.controller')

const router = express.Router();


router.get('/getAllFriend',auth,getAllFriend);
router.post('/addFriend',auth,addFriend);
router.post('/acceptRequest',auth,acceptRequest)
router.get('/getAllFriendRequest',auth,getAllFriendRequest)
router.delete('/removeFriend',auth,removeFriend);


module.exports = router;