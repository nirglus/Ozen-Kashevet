const { Router } = require("express");
const { auth, authorize } = require("../middleware/auth");
const { register, login, deleteUser, updateUser, getUsers, showUser, getUsersinQuary, uploadUserImage } = require("../controllers/user.controller");
const upload = require("../middleware/uploud");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, showUser);
router.get("/find", getUsers)
router.delete("/:id", auth, authorize(["admin"]), deleteUser);
router.patch("/:id", auth, updateUser);
router.get("/findUser",getUsersinQuary)
router.post("/image", upload.single("userImage"), auth, uploadUserImage);


module.exports = router;