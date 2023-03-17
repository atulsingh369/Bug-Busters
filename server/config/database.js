const mongoose = require("mongoose");

const connectDatabase = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(`mongodb://localhost:27017/Bug-Busters`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// make the process fail
		process.exit(1);
	}
}
module.exports = connectDatabase;
