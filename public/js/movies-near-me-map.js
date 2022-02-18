
let map, geocoder, infowindow, address, googleResponses

//const handler = new APIHandler()

function initMap() {
    paintMap()
    getCoords()
}

function paintMap() {
    map = new google.maps.Map(document.querySelector(".main-map"), {
        zoom: 16,
        center: { lat: 40.417950685105744, lng: -3.703645287872495 }
    })
    geocoder = new google.maps.Geocoder()
    infowindow = new google.maps.InfoWindow()
}

function getCoords() {
    navigator.geolocation.getCurrentPosition(
        geolocationDetails => getLocation(geolocationDetails),
        errorDetails => console.log('fallo --->', errorDetails)
    )
}

function getLocation(geolocationDetails) {

    const { latitude, longitude } = geolocationDetails.coords
    const position = { lat: latitude, lng: longitude }
    const { Marker } = google.maps

    map.setCenter(position)
    console.log(position)
    new Marker({ map, position })

    geocoder
        .geocode({ location: position })
        .then((response) => {

            googleResponse = response.results
            //googleResponse.shift()
            new Marker({ map, position })
            setQueryListeners()
        })

}

function setQueryListeners() {
    document.getElementById('neighborhood').addEventListener('click', () => moviesIn('neighborhood', "results-neighborhood", googleResponse))
    document.getElementById('sublocality').addEventListener('click', () => moviesIn('sublocality', "results-sublocality", googleResponse))
    document.getElementById('locality').addEventListener('click', () => moviesIn('locality', "results-locality", googleResponse))
}


function moviesIn(key, selector, arr) {

    arr.forEach(elm => {

        const addressElement = elm.address_components[0]

        if (addressElement.types.includes(key)) {

            handler
                .getMoviesByLocation(addressElement.long_name)
                .then(response => {
                    console.log(response)
                    response.data.results.length != 0 ? console.log(`resultados por ${key}  ${addressElement.long_name} son`, response.data.results) : console.log(`no hay resultados para  ${key}  ${addressElement.long_name}`)
                    response.data.results.length != 0 ? cardFormer(selector, response.data.results) : null
                })
        }
        else { console.log("no hay coincidencias") }
    })
}

function cardFormer(selector, arr) {

    document.querySelector(`.${selector}`).classList.remove("inactive")
    let carrousel = document.getElementById(selector)

    arr.forEach(elm => {
        let newCarrouselItem = document.createElement("div")
        newCarrouselItem.setAttribute('class', "carousel-item")
        newCarrouselItem.setAttribute('style', 'background-color: rgb(231, 161, 10); padding: 20px; border-radius: 5%;')

        let newImage = document.createElement("figure")
        newImage.innerHTML = `<img src="${elm.image}" class="d-block w-100" alt="${elm.title} image">`
        let newCaption = document.createElement("div")
        newCaption.setAttribute("style", "color: black;")
        newCaption.innerHTML = `<h5>${elm.title}</h5> <p>${elm.stars}</p>`

        newCarrouselItem.appendChild(newImage)
        newCarrouselItem.appendChild(newCaption)
        carrousel.appendChild(newCarrouselItem)

    })
    carrousel.firstElementChild.classList.add("active")
}














