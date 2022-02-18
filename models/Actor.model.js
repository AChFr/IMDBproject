const { Schema, model } = require("mongoose")

const actorSchema = new Schema(
    {
        name: String,
        image: String,
        birthDate: Date,
        deathDate: Date,

    },
    {
        timestamps: true,
    }
)

module.exports = model("Actor", actorSchema)