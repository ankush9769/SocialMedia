import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text:{ type:String, required:true },
    date:{type:Date,default:Date.now},
})

const postSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    photo:{
        type: String
    },
    likes:[{
        type:mongoose. Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments:[commentSchema]
})

const Post = mongoose.model('Post', postSchema);

export default Post;