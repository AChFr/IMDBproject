const button = document.getElementById("random-movie-btn")

button.addEventListener("click", getRandomMovie)


function getRandomMovie() {

    let i

    handler
        .getRandomMovies()
        .then(response => {

            i = Math.floor(Math.random() * (response.data.results.length + 1))
            console.log(i)
            console.log("P E L I C U L A ", response.data.results[i])
            randomFormer(response.data.results[i])
        })

}

function randomFormer(movie) {

    document.getElementById("result-random").classList.remove("inactive")
    document.getElementById("image-random").setAttribute("src", `${movie.image}`)
    document.getElementById("image-random").setAttribute("alt", `${movie.title} image`)
    document.getElementById("title-random").innerText = movie.title
    document.getElementById("plot-random").innerText = movie.plot
    document.getElementById("stars-random").innerText = movie.stars
    document.getElementById("link-random").setAttribute("href", `/details/${movie.id}`)

}



