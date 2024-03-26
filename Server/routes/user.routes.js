const { Router } = require("express");
const { auth, authorize } = require("../middleware/auth");
const { register, login, deleteUser, updateUser, getUsers, showUser, getUsersinQuary } = require("../controllers/user.controller");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, showUser);
router.get("/find", getUsers)
router.delete("/:id", auth, authorize(["admin"]), deleteUser);
router.patch("/:id", auth, updateUser);
router.get("/findUser",getUsersinQuary)


module.exports = router;