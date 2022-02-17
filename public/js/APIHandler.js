class APIHandler {


    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://imdb-api.com/API/AdvancedSearch/k_1clttgjh`
            //
            //k_3hj01a38
        })
    }

    getMoviesByLocation(currentLocation) {


        return this.axiosApp.get(`?locations=${currentLocation}`)
    }
}








