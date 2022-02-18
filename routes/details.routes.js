const router = require("express").Router()
const { isLoggedIn } = require("../middleware/route-guard")
//const { addFavorite } = require("../utils/index")
const Movie = require("../models/Movie.model")
const Actor = require("../models/Actor.model")
const User = require("../models/User.model")


router.get("/film/:movieId", isLoggedIn, (req, res, next) => {
    const { movieId } = req.params
    res.render('details/movie-detail', { movieId })
})

router.post("/film/:movieId", isLoggedIn, (req, res, next) => {

    const { movieId } = req.params
    //addFavorite(Movie, favoriteMovies)

    const user = req.session.currentUser
    let favoriteItem
    Movie
        .create({ ...req.body })
        .then(newItem => {
            favoriteItem = newItem
            return User.findOne({ _id: user._id })
        })
        .then(person => {
            person.favoriteMovies.push(favoriteItem)
            person.save()
            res.redirect(`/user/${user._id}`)
        })
        .catch(err => next(err))


})

router.get("/actor/:actorId", (req, res, next) => {
    const { actorId } = req.params
    console.log({ actorId })
    res.render('details/actor-detail', { actorId })

})

router.post("/actor/:actorId", isLoggedIn, (req, res, next) => {

    const { movieId } = req.params
    //addFavorite(Movie, favoriteMovies)

    const user = req.session.currentUser
    let favoriteItem
    Actor
        .create({ ...req.body })
        .then(newItem => {
            favoriteItem = newItem
            return User.findOne({ _id: user._id })
        })
        .then(person => {
            person.favoriteActors.push(favoriteItem)
            person.save()
            res.redirect(`/user/${user._id}`)
        })
        .catch(err => next(err))


})

module.exports = router;
