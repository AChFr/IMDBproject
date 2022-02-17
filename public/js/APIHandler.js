class APIHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://imdb-api.com/API/`
            //
            //k_3hj01a38
            //k_1clttgjh

            //ver el tema del /en/
        })
    }

    getMoviesByLocation(currentLocation) {
        return this.axiosApp.get(`AdvancedSearch/k_3hj01a38?&locations=${currentLocation}`)
    }

    getRandomMovies() {
        return this.axiosApp.get(`AdvancedSearch/k_3hj01a38?title_type=feature&groups=top_250&count=250`)
    }

    getMovieFiltered(param) { }

}








