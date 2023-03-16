import mongoose from "mongoose";

const {Schema} = mongoose;

const PostSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  // author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

const Post = mongoose.model("Post", PostSchema);
export default Post;