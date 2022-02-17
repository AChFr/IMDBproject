const router = require("express").Router()

router.get("/film/:movieId", (req, res, next) => {
    res.render('film/movie-detail')

})

// /details/:actorId

module.exports = router;
