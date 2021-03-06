const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },

    password: String,

    email: {
      type: String,
      required: true,

    },

    profileImg: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },

    description: String,

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },


    favoriteMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],

    favoriteActors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],

    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

  },
  {
    timestamps: true,
  }
);



module.exports = model("User", userSchema);



