const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/auth.route.js");
const userRoute = require("./routes/user.route.js");
const reviewRoute = require("./routes/review.route.js");
const orderRoute = require("./routes/order.route.js");
const messageRoute = require("./routes/message.route.js");
const gigRoute = require("./routes/gig.route.js");
const conversationRoute = require("./routes/conversation.route.js");
require("dotenv").config();

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);

app.get("/test", (req, res) => {
  res.status(200).json({ status: "success" });
});
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("backend is running");
});
