// import User from '../models/User.js';
import Post from '../models/Post.js';

export const createpost=async (req,res)=>{        //post creation
    const {content,photo} =req.body;
    const userId=req.userId;

    try{
        const newpost = new Post({
            author:userId,
            content,
            photo,
        })
        await newpost.save()
        return res.status(201).json({message:"post created successfully",newpost})
    }
    catch(err){
        return res.status(500).json({message:"error creating post",err:err.message})
    }
}


export const getallpost=async (req,res)=>{                //getting all post for feed
    try{
        const allposts= await Post.find().sort({createdAt:-1}).populate('author','username email').populate('comments.userID','username')
        return res.status(200).json({allposts})
    }
    catch(err){
        return res.status(500).json({message:"error fetching posts",err:err.message})
    }
}

export const likepost= async (req,res)=>{                 //like and unlike the post and return the number of the like
    const userId = req.userId;
    const {postId} = req.params;

    try{
        const post = await Post.findById(postId);

        if(!post) return res.status(404).json({message:"post not found"});
        
        const alreadyliked = post.likes.includes(userId);
        if(alreadyliked){
            post.likes = post.likes.filter(id=>id.toString() !== userId);
        }
        else{
            post.likes.push(userId);
        }
        await post.save()
        return res.status(200).json({message:"post liked successfully",likes:post.likes.length})
    }
    catch(err){
        return res.status(500).json({message:"error liking post",err:err.message})
    }
}

export const commentonpost= async (req,res)=>{            //comment on the post
    const userId = req.userId;
    const {postId} = req.params;
    const {text} = req.body;

    try{
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:"post not found"});

        post.comments.push({userId,text})
        await post.save()
        return res.status(200).json({message:"comment added successfully",comment:post.comments})
    }
    catch(err){
        return res.status(500).json({message:"error commenting on post",err:err.messag})
    }
}