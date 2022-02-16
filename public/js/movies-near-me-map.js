let map
let geocoder
let infowindow
let adress
let googleResponse
const handler = new APIHandler()

function initMap() {
    paintMap()
    getCoords()


}




function paintMap() {
    map = new google.maps.Map(document.querySelector(".main-map"), {
        zoom: 16,
        center: { lat: 40.417950685105744, lng: -3.703645287872495 },
    });

    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
}

function getCoords() {

    navigator.geolocation.getCurrentPosition(
        geolocationDetails => centerMap(geolocationDetails),
        errorDetails => console.log('fallo --->', errorDetails)
    )
}

function centerMap(geolocationDetails) {

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

            new Marker({ map, position })
            askForMovies()
        })



}

function askForMovies() {



    googleResponse.shift()
    console.log(googleResponse)


    for (let i = 0; i < googleResponse.length; i++) {
        const elm = googleResponse[i]

        if (elm.address_components[0].types.includes('neighborhood')) {
            console.log("BBBBBBBBB")
            handler
                .getMoviesByLocation(elm.address_components[0].long_name)
                .then(resultados => {

                    resultados.data.results.length != 0 ? console.log("resultados son", resultados) : null
                })

            // break
        }

        else if (elm.address_components[0].types.includes('sublocality')) {
            console.log("CCCCCCCC")
            handler
                .getMoviesByLocation(elm.address_components[0].long_name)
                .then(resultados => {

                    resultados.data.results.length != 0 ? console.log("resultados son", resultados) : null
                })
            // break
        }
        else if (elm.address_components[0].types.includes('locality')) {
            console.log("ddddddddd")
            handler
                .getMoviesByLocation(elm.address_components[0].long_name)
                .then(resultados => {
                    console.log("resultados son", resultados)
                    resultados.data.results.length != 0 ? console.log("resultados son", resultados) : null
                })
            //break
        }

        else { console.log("NO HAY RESULTADOS") }
    }


}

function showMovies(arr) {

}

function cardFormer(elm) {
    let newCard = document.createElement("div") //card
    newCard.setAttribute('class', "movie-info") //card

    let newTitle = document.createElement("div") //titulo
    newTitle.innerText = `titulo ${elm.title}` // titulo

    let newActors = document.createElement("ul") //actores
    elm.starlist.forEach((star, idx) => {


    })
    newActors.innerText = `OCCUPATION: ${elm.occupation}`
    let newCartoon = document.createElement("div")
    newCartoon.innerText = `CARTOON: ${elm.cartoon}`
    let newWeapon = document.createElement("div")
    newWeapon.innerText = `WEAPON: ${elm.weapon}`
    let newId = document.createElement("div")
    newId.innerText = `ID: ${elm.id}`



    const inputs = document.querySelectorAll('#edit-character-form input')

    let fieldId = inputs[0]
    let fieldName = inputs[1]
    let fieldOcc = inputs[2]
    let fieldWeapon = inputs[3]
    let fieldCartoon = inputs[4]

    fieldId.value = elm.id
    fieldName.value = elm.name
    fieldOcc.value = elm.occupation
    fieldWeapon.value = elm.weapon
    fieldCartoon.checked = elm.cartoon

    newCard.appendChild(newName)
    newCard.appendChild(newOcc)
    newCard.appendChild(newCartoon)
    newCard.appendChild(newWeapon)
    newCard.appendChild(newId)

    document.querySelector(".characters-container").appendChild(newCard)
}