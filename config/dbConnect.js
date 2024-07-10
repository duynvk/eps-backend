const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    });
};
module.exports = dbConnect;
