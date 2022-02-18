const { Schema, model } = require("mongoose");


const movieSchema = new Schema(
    {

        name: String,
        plot: String,
        image: String,
        releaseYear: String,


    },
    {

        timestamps: true,
    }
);



module.exports = model("Movie", movieSchema);