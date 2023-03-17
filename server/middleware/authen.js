// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("./catchAsyncErrors");
// const jwt = require("jsonwebtoken");
// const Alumni = require("../models/AlumniModel");

// exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
// 	const { token } = req.cookies;

// 	console.log(req.cookies)

// 	if (!token) {
// 		return next(new ErrorHander("Please Login to access this resource", 401));
// 	}

// 	const decodedData = jwt.verify(token, process.env.JWT_SECRET);

// 	req.alumni = await Alumni.findById(decodedData.id);

// 	next();
// });

// exports.authorizeRoles = (roles) => {
//   return (req, res, next) => {
//     if (roles!==req.alumni.role) {
//       return next(
//         new ErrorHander(
//           `Role: ${req.alumni.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }

//     next();
//   };
// };

exports.isAuthorized = (req, res, next) => {
	console.log(req)
	if (req.alumni.role !== "admin") {
		res.status(401).send()
		return;
	}

	next();
};