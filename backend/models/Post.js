const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },

    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        default: null // null means it's a global post
    },

    content: {
        type: String,
        required: true,
        maxlength: 500
    },

    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],

    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    }, // for replies

    replyCount: {
        type: Number,
        default: 0
    },

    repostOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    }, // for reposts

    repostCount: {
        type: Number,
        default: 0
    },

    federation: {
        federationStatus: {
            type: String,
            enum: ["local_only", "queued", "federated"],
            default: "local_only"
        },
        activityPubId: { // for when we make implement the federation
            type: String,
            unique: true,
            sparse: true
        },
        federatedTo: [{ // to which servers this post has been federated
            serverUrl: String,
            federatedAt: Date
        }]
    },

    isDeleted: { // so we can keep the post for reference but not show it + also remove it from federated servers
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

// INDEXING ()
// Channel posts (posts within a specific channel)
postSchema.index({ server: 1, channel: 1, createdAt: -1 });

// Global posts (server-wide, no channel)
postSchema.index({ server: 1, channel: null, createdAt: -1 });

// Local timeline (all posts from THIS server, newest first)
postSchema.index({ server: 1, createdAt: -1 });

// Home timeline (posts by specific authors - you query with $in on followed users)
postSchema.index({ author: 1, createdAt: -1 });

// Federated timeline (posts from OTHER servers)
postSchema.index({ 'federation.federationStatus': 1, createdAt: -1 });

// Profile posts (posts by a specific user)
postSchema.index({ author: 1, isDeleted: 1, createdAt: -1 });

// Thread/replies
postSchema.index({ replyTo: 1, createdAt: 1 });

// Federation lookup
postSchema.index({ 'federation.activityPubId': 1 });

postSchema.virtual('likeCount').get(function () {
    return this.likes.length;
});

postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
