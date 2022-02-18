class APIHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `/imdb-api.com/API/`
            //
            //k_3hj01a38
            //k_1clttgjh
            //k_lah58tyq
            //k_88qqmbwg
            //k_9y821eyd
        })
    }

    getMoviesByLocation(currentLocation) {
        return this.axiosApp.get(`AdvancedSearch/k_9y821eyd?&locations=${currentLocation}`)
    }
    getRandomMovies() {
        return this.axiosApp.get(`AdvancedSearch/k_9y821eyd?title_type=feature&groups=top_250&count=250`)
    }
    getMovieDetails(movieID) {
        return this.axiosApp.get(`Title/k_9y821eyd/${movieID}`)
    }
    getActorDetails(actorID) {
        return this.axiosApp.get(`Search/k_1clttgjh/${actorID}`)


    }

}