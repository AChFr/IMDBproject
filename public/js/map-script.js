let map







function mapInit() {

    drawMap()
    getCoords()

}

function drawMap() {

    const { Map } = google.maps

    map = new Map(
        document.querySelector('.main-map'),
        {
            zoom: 15,
            center: { lat: 40.417950685105744, lng: -3.703645287872495 },

        }
    )
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

    new Marker({ map, position })
}
