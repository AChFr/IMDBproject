const { Schema, model } = require("mongoose");


const placeSchema = new Schema(
    {
        country: String,
        name: String,
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

    },
    {

        timestamps: true,
    }
);


placeSchema.index({ location: '2dsphere' })
module.exports = model("Place", placeSchema);



