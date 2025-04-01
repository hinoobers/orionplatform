// react component
import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <span>By {post.author}</span>
        </div>
    );
}

export default Post;