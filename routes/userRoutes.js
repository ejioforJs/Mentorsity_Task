const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/protected",userController.isAuthenticated, userController.protected)
router.post("/logout", userController.isAuthenticated, userController.logout)

module.exports = router;