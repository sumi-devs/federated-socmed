import { createError } from "../utils/error.js";
import Post from "../models/Post.js";
import Channel from "../models/Channel.js"; 

export const createPost = async (req, res, next) => {
  try {
    const { description, image, isChannelPost, channelName } = req.body;

    if (!description || description.trim() === "") {
      return next(createError(400, "Post description is required"));
    }

    const isUserPost = !isChannelPost;

    // ===== CHANNEL POST VALIDATION =====
    let channel = null;

    if (isChannelPost) {
      if (!channelName) {
        return next(createError(400, "Channel name is required for channel posts"));
      }

      channel = await Channel.findOne({
        name: channelName,
        serverName: req.user.serverName
      });


      if (!channel) {
        return next(createError(404, "Channel not found"));
      }

      if (channel.isRemote) {
        return next(createError(403, "Cannot post directly to a remote channel"));
      }

      // Enforce visibility rules
      if (channel.visibility === "read-only" && req.user.role !== "admin") {
        return next(createError(403, "This channel is read-only"));
      }

      if (channel.visibility === "private") {
        return next(createError(403, "This channel is private"));
      }
    }

    // ===== FEDERATED ID =====
    let postFederatedId;
    if (isChannelPost) {
      postFederatedId = `${channelName}@${req.user.serverName}/post/${Date.now()}`;
    } else {
      postFederatedId = `${req.user.federatedId}/post/${Date.now()}`;
    }

    // ===== CREATE POST =====
    const newPost = new Post({
      description: description.trim(),
      image: image || null,

      isUserPost,
      userDisplayName: isUserPost ? req.user.displayName : null,

      isChannelPost: !!isChannelPost,
      channelName: isChannelPost ? channelName : null,

      federatedId: postFederatedId,
      originServer: req.user.serverName,
      serverName: req.user.serverName,

      isRemote: false,
      federationStatus: "local",
      federatedTo: []
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      post: savedPost
    });

  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(createError(404, "Post not found"));
    }
    if (post.isRemote) {
      return next(createError(403, "Cannot modify remote content"));
    }

    if (
      post.userDisplayName !== req.user.displayName &&
      req.user.role !== "admin"
    ) {
      return next(createError(403, "Unauthorized action"));
    }
      
    await Post.findByIdAndDelete(postId);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.federatedId;

    const post = await Post.findById(postId);
    if (!post) {
      return next(createError(404, "Post not found"));
    }

    if (post.isRemote) {
  // Forward to origin server instead of modifying locally
      return next(createError(403, "Remote like forwarding not implemented yet"));
    }
    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      post.likedBy.pull(userId);
      post.likeCount = Math.max(0, post.likeCount - 1);
    } else {
      post.likedBy.push(userId);
      post.likeCount += 1;
    }

    await post.save();

    return res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likeCount: post.likeCount
    });
  } catch (err) {
    return next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      posts
    });
  } catch (err) {
    next(err);
  }
}


export const createComment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return next(createError(400, "Comment content is required"));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(createError(404, "Post not found"));
    }

    //Later to be Changed - For now, we are not allowing commenting on remote posts until we implement comment forwarding
    if (post.isRemote) {
      return next(createError(403, "Remote comment forwarding not implemented yet"));
    }

    const newComment = {
      displayName: req.user.displayName,
      image: req.user.image || null,
      content: content.trim(),
      commentFederatedId: `${req.user.federatedId}/comment/${Date.now()}`,
      originServer: req.user.serverName
    };

    console.log(req.user);

    post.comments.push(newComment);
    await post.save();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
