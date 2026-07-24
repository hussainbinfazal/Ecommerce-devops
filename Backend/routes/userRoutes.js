
const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/isAuthenticated');
const upload = require('../uploads/userprofile/userProfile');
const {registerUser , getUsers, getUserById, deleteUser, updateUser, loginUser , logoutUser,userAuthentication ,allUsers,generateRandomUsers ,updateUserToAdmin ,deleteUserByAdmin,contactSupport} = require('../controllers/userControllers')


router.post('/register',upload.single('profileImage'),registerUser);
router.get('/all',getUsers);
router.get('/user/:userId',protect,getUserById);
router.delete('/user/:userId',protect,deleteUser);
router.put('/user/:userId',protect,upload.single('profileImage'),updateUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/user',protect,userAuthentication);
// admin Routes
router.get("/all",protect,allUsers)
router.put('/update/:userId', protect, updateUserToAdmin);
router.delete('/delete/:userId', protect, deleteUserByAdmin);
router.post('/generate-random', generateRandomUsers);
router.post('/contactUs',protect, contactSupport);

module.exports = router;