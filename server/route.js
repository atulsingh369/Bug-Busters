const express = require("express");
const {
	register,
	login,
	logout,
	forgotPassword,
	resetPassword,
	getallUsers,
	deleteUser
} = require("./controller");
// const { isAuthorized } = require("../middleware/authen");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

// router.route("/account").get( loadAlumni);

// router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// router.route("/account/update").put(isAuthenticatedUser, updateProfile);

router
	.route("/alumnis").get(getallUsers);

router
	.route("/alumni/:id")
	.delete(deleteUser);

module.exports = router;
