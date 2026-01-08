const express = require ("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser,}= require("../controllers/authController")

router.get("/", (req, res) => {
  res.render("index", { error: "" });
});

router.get("/logout", logoutUser); 

router.post("/register", registerUser);
router.post("/login",loginUser);


router.use((req, res, next) => { 
  console.log("📦 /user route reached");
  next();
});


module.exports = router;
