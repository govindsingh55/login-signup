const express = require('express');
const router = express.Router();
const UserController = require("./controllers/UserController");

router.get('/', (req, res) => {
	console.log('default routes');
	res.status(200).json({
		message: 'first response from server'
	});
});

router.post('/signup', 
  UserController.validate('signup'),
  UserController.signup
);
router.post('/login', 
  UserController.validate('login'),
  UserController.login
);

module.exports = router;
