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
                <button onClick={handleLike} className="like-button">❤️ Like ({likes})</button>
            </div>

            <div className="comments-section">
                <h4>Comments</h4>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
                <div className="comment-form">
                    <input 
                        type="text" 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder="Add a comment..." 
                    />
                    <button onClick={handleAddComment}>Post</button>
                </div>
            </div>
        </div>
    );
};

export default Post;
