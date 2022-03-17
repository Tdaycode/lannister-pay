const express= require('express');
const dotenv = require('dotenv'); 
const morgan = require('morgan');
const paymentRoutes = require('./routes/paymentRoute');

const cors = require('cors');

const app = express();
dotenv.config();



if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cors());

// app.use("/api/v1/pay", paymentRoutes);
app.get("*", function (req, res) {
  res.set("Content-Type", "text/json");
  res.status(200).send("app is working ");
});


app.use("/", paymentRoutes)

module.exports = app;
