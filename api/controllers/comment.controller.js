import Comment from "../model/comment.model.js"
import customError from "../utils/customError.js"
import User from "../model/user.model.js";
export const createComment = async(req,res,next)=>{
    try {
        const {content,postId,userId}=req.body
        if(userId !== req.user.id){
            return next(customError(403, 'You are not allowed to create this comment'))
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()
        res.status(200).json(newComment)
    } catch (error) {
        next(error)
        console.log(error)
    }
}

export const getComment = async(req,res,next)=>{
    try {
        const comment = await Comment.find({postId:req.params.postId}).sort({
            createdAt:-1
        })
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

export const likeComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return next(customError(404,'comment not found'))
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex ===-1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id)
        }else{
            comment.numberOfLikes -=1;
            comment.likes.splice(userIndex,1)
        }
        await comment.save()
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}