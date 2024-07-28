const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/Auth");

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 1000,
    },
    {
      name: "laptop",
      price: 80000,
    },
  ]);
});

module.exports = router;
