const ErrorHander = require("./utils/errorhander");
const catchAsyncErrors = require("./middleware/catchAsyncErrors");
const User = require("./model")
const sendToken = require("./utils/jwtToken");
const sendEmail = require("./utils/sendEmail");
const crypto = require("crypto");
const ApiFeatures = require("./utils/apifeatures");
const cloudinary = require("cloudinary");

// Register a Alumni
exports.register = catchAsyncErrors(async (req, res, next) => {
	const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: "avatars",
		width: 150,
		crop: "scale",
	});

	const { name, email, password, contact } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		contact,
		avatar: {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		},
	});

	sendToken(user, 201, res);
});

// Contact US
exports.contactUs = catchAsyncErrors(async (req, res, next) => {
	const { Cname, Cemail, Cquery, Ccontact } = req.body;

	const contactUs = await Contact.create({
		Cname,
		Cemail,
		Cquery,
		Ccontact,
	});

	sendToken(contactUs, 201, res);
});

// Login User
exports.login = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	// checking if user has given password and email both

	if (!email || !password) {
		return next(new ErrorHander("Please Enter Email & Password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHander("Invalid email or password", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHander("Invalid email or password", 401));
	}

	sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: "Logged Out",
	});
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHander("User not found", 404));
	}

	// Get ResetPassword Token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/password/reset/${resetToken}`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: `IERTAS Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `${resetPasswordUrl}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await alumni.save({ validateBeforeSave: false });

		return next(new ErrorHander(error.message, 500));
	}
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	// creating token hash
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHander(
				"Reset Password Token is invalid or has been expired",
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHander("Password does not matched", 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// update Alumni password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const alumni = await Alumni.findById(req.alumni.id).select("+password");

	const isPasswordMatched = await alumni.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHander("Old Password is incorrect", 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHander("Password does not matched", 400));
	}

	alumni.password = req.body.newPassword;

	await alumni.save();

	sendToken(alumni, 200, res);
});

// update Alumni Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newAlumniData = {
		name: req.body.name,
		email: req.body.email,
		contact: req.body.contact,
	};

	if (req.body.avatar !== "") {
		const alumni = await Alumni.findById(req.alumni.id);

		const imageId = alumni.avatar.public_id;

		await cloudinary.v2.uploader.destroy(imageId);

		const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: "avatars",
			width: 150,
			crop: "scale",
		});

		newAlumniData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	const alumni = await Alumni.findByIdAndUpdate(req.alumni.id, newAlumniData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Get all Alumni
exports.getallUsers = catchAsyncErrors(async (req, res, next) => {
	const resultPerPage = 8;
	const userCount = await User.countDocuments();

	const apiFeature = new ApiFeatures(User.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);

	const users = await apiFeature.query;

	// let filteredAlumnisCount = alumnis.length;


	// alumnis = await apiFeature.query;

	res.status(200).json({
		success: true,
		users,
		userCount,
		resultPerPage,
		// filteredAlumnisCount,
	});

	// const alumnis = await Alumni.find();

	// res.status(200).json({
	//   success: true,
	//   alumnis,
	// });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
		);
	}

	const imageId = user.avatar.public_id;

	await cloudinary.v2.uploader.destroy(imageId);

	await user.remove();

	res.status(200).json({
		success: true,
		message: "User Deleted Successfully",
	});
});
