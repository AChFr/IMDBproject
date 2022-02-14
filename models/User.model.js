const { Schema, model } = require("mongoose");




// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
      unique: true,
    },

    profileImg: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },

    description: String,

    role: {
      required: true,
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },

    visitedPlaces: [{
      name: String,
      comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    }],
    favoriteMovies: [{
      title: String,
      comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    }],
    favoriteActors: [{
      name: String,
      comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    }],



  },
  {
    timestamps: true,
  }
);



module.exports = model("User", userSchema);



