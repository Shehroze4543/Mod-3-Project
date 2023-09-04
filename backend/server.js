require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mealsRoutes = require("./routes/meals");

// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// routes
// app.get("/", (req, res) => {
//   res.json({ mssg: `Welcome to the app` });
// });
app.use("/api/meals", mealsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`CONNECTED TO DB & LISTENING ON PORT 3080`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
