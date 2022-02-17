



document.addEventListener("load", movieDetails())


function movieDetails() {

    const movieID = document.getElementById("movie-id").innerText
    handler
        .getMovieDetails(movieID)
        .then(result => {
            console.log(result.data)
            fillMovieDetails(result.data)
        })
}

function fillMovieDetails(obj) {

    document.getElementById("movie-title").innerText = obj.title
    document.getElementById("movie-genre").innerText = obj.genres
    document.getElementById("movie-plot").innerText = obj.plot

    obj.starList.forEach(elm => {
        const star = document.createElement("li")
        star.innerHTML = `<a href="http:/details/actor/${elm.id}"><strong>${elm.name}</strong></a>`
        document.getElementById("movie-stars").appendChild(star)
    });

    document.getElementById("movie-year").innerText = obj.year
    document.getElementById("movie-rating").innerText = obj.imDbRating
    document.getElementById("movie-image").setAttribute("src", `${obj.image}`)
}

