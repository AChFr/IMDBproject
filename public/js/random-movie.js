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


    // let newCarrouselItem = document.createElement("div")
    // newCarrouselItem.setAttribute('class', "carousel-item")

    // let newImage = document.createElement("figure")
    // newImage.innerHTML = `<img src="${elm.image}" class="d-block w-100" alt="${elm.title} image">` //imagen



    // let newCaption = document.createElement("div")//caption
    // newImage.newCaption = `<h5>${elm.title}</h5> <p>${elm.stars}</p>`


    // newCarrouselItem.appendChild(newImage)
    // newCarrouselItem.appendChild(newCaption)

    // document.getElementById("result-random").appendChild(newCard)


