// react component
import { useEffect, useState } from 'react';
import { getPosts } from '../APIController';
import Post from './Post';

const PostList = () => {
    console.log("PostList component rendered");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await getPosts(); 
            if (postsData) {
                setPosts(postsData);
            }
        };
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