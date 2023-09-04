require("dotenv").config();
const express = require("express");
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
// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`LISTENING ON PORT 3080`);
});
