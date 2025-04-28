// react component
import { useEffect, useState } from 'react';
import { getPosts } from '../APIController';
import Post from './Post';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002', {
    withCredentials: true,
    transports: ['websocket'], // Use WebSockets for faster communication
  });

const PostList = () => {
    console.log("PostList component rendered");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await getPosts(); 
            // sort so newest posts are first
            postsData.sort((a, b) => new Date(b.created) - new Date(a.created));
            if (postsData) {
                setPosts(postsData);
            }
        };

        socket.on("message", (message) => {
            if(message === "update") {
                fetchPosts();
            }
        });
        fetchPosts();
    }, []);

    return (
        <div className="post-list">
            {posts.map(post => (
                <Post post={post}></Post>
            ))}
        </div>
    );
}

export default PostList;