import React, { useState } from 'react';
import './Post.css';

const Post = ({ post }) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleLike = () => {
        setLikes(likes + 1);
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
                <button onClick={handleLike} className="action-button">❤️ Like ({likes})</button>
                <button onClick={() => {}} className='action-button'>💬 Comment</button>
            </div>
        </div>
    );
};

export default Post;
