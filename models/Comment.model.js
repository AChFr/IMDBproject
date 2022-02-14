const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorImg: String,
    content: String,
    date: Date

  },
  {

    timestamps: true,
  }
);



module.exports = model("Comment", commentSchema);



