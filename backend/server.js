require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mealRoutes = require("./routes/meals");
const userRoutes = require("./routes/user");
const cors = require("cors");

// express app
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://mern-full-stack-application.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// routes
// app.get("/", (req, res) => {
//   res.json({ mssg: `Welcome to the app` });
// });
app.use("/api/meals", mealRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`CONNECTED TO DB & LISTENING ON PORT 3081`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
