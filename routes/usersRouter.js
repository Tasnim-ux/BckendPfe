var express = require('express');
var router = express.Router();
/* GET users listing. */
const usercontroller = require("../controllers/usercontroller")
const uploadfile = require('../middlewares/uploadFile')
router.get('/getAllUsers', usercontroller.getAllUsers);
router.get('/getUserById/:id', usercontroller.getUserById);
router.post('/addmembre', usercontroller.addmembre );
router.post('/addcoach', usercontroller.addcoach );
router.post('/addadmin', usercontroller.addadmin );
router.delete('/DeleteUserById/:id',usercontroller.DeleteUserById )
router.get('/getOrderUsersByAge',usercontroller.getOrderUsersByAge )
router.get('/searchUsersByUsername',usercontroller.searchUsersByName )
router.post('/addmembreWithFile',uploadfile.single("image_User"),usercontroller.addmembreWithFile )
module.exports = router;
