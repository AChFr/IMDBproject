const { Schema, model } = require("mongoose");


const actorSchema = new Schema(
    {

        name: String,
        birthDate: Date,
        deathDate: Date,

        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    },
    {

        timestamps: true,
    }
);



module.exports = model("Actor", actorSchema);



