class APIHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://imdb-api.com/API/`
            //
            //k_3hj01a38
            //k_1clttgjh
            //k_lah58tyq
            //k_88qqmbwg

        })
    }

    getMoviesByLocation(currentLocation) {
        return this.axiosApp.get(`AdvancedSearch/k_88qqmbwg?&locations=${currentLocation}`)
    }

    getRandomMovies() {
        return this.axiosApp.get(`AdvancedSearch/k_88qqmbwg?title_type=feature&groups=top_250&count=250`)
    }

    getMovieGenre(input) { }

}








