import React, { useState } from 'react';
import './Post.css';
import { handleTweetLike } from '../APIController';

const Post = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleLike = () => {
        handleTweetLike(post.id);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <div className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <span>By {post.username}</span>

            <div className="post-actions">
                <button onClick={handleLike} className="action-button">❤️ Like ({JSON.parse(post.likedBy).length})</button>
                <button onClick={() => {}} className='action-button'>💬 Comment</button>
            </div>
        </div>
    );
};

export default Post;
