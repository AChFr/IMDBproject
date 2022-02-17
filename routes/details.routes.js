const router = require("express").Router()
const Movie = require('../models/Movie.model')

router.get("/details/:movie.id", (req, res, next) => {

const {id} = req.params

    Movie
        .findById()
        .then(el => console.log(el))
    

})



module.exports = router;
