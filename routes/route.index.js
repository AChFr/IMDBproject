const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



const auth = require("./routes/auth/route.auth");
app.use("/", auth);

module.exports = router;
