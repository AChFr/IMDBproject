class APIHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://imdb-api.com/API/`
            //
            //k_3hj01a38
            //k_1clttgjh
            //k_lah58tyq

        })
    }

    getMoviesByLocation(currentLocation) {
        return this.axiosApp.get(`AdvancedSearch/k_lah58tyq?&locations=${currentLocation}`)
    }

    getRandomMovies() {
        return this.axiosApp.get(`AdvancedSearch/k_lah58tyq?title_type=feature&groups=top_250&count=250`)
    }

    getMovieGenre(input) { }

}








