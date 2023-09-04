const express = require("express");

const router = express.Router();

// GET ALL MEALS
router.get("/", (req, res) => {
  res.json({ mssg: "GET ALL MEALS" });
});

// GET A SINGLE MEAL
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single meal" });
});

// POST A NEW MEAL
router.post("/", (req, res) => {
  res.json({ mssg: "POST a single meal" });
});

// DELETE A  MEAL
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a meal" });
});

// UPDATE A NEW MEAL
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a meal" });
});
module.exports = router;
