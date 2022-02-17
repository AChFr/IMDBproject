const { Schema, model } = require("mongoose");


const movieSchema = new Schema(
    {

        name: String,
        plot: String,
        releaseYear: String,

        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    },
    {

        timestamps: true,
    }
);



module.exports = model("Movie", movieSchema);