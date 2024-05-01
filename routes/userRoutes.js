const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);

module.exports = router;
