const router = require("express").Router()
const Movie = require('../models/Movie.model')

// router.get("/movie/:id", (req, res, next) => {

router.get("/film/:movieId", (req, res, next) => {
    const { movieId } = req.params
    console.log({ movieId })
    res.render('film/movie-detail', { movieId })

})

router.get("/actor/:actorId", (req, res, next) => {
    const { actorId } = req.params
    console.log({ actorId })
    res.render('film/actor-detail', { actorId })

})


module.exports = router;
