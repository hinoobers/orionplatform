import React, { useState } from 'react';
import './Post.css';
import { handleTweetLike } from '../APIController';

const Post = ({ post }) => {
    const handleLike = () => {
        handleTweetLike(post.id);
    };


    return (
        <div className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <span>By {post.username}</span>

            <div className="post-actions">
                <button onClick={handleLike} className="action-button">❤️ Like ({JSON.parse(post.likedBy).length})</button>
            </div>
        </div>
    );
};

export default Post;
