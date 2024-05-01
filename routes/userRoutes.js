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
router.get("/showMe", showCurrentUser);
router.get("/:id", getSingleUser);
router.post("/updateUser", updateUser);
router.post("/updateUserPassword", updateUserPassword);

module.exports = router;
