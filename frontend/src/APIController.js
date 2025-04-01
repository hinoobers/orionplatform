let TOKEN = null;

const setToken = (token) => {
    TOKEN = token;
}

const getPosts = async () =>{
    const result = await fetch("http://localhost:3001/posts/listall");
    const data = await result.json();
    if(!data.success) {
        console.log("No posts found");
        return;
    }

    console.log(data.posts);
    return data.posts;
};

module.exports = {
    setToken,
    getPosts
}