let TOKEN = null;

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

const handleLogin = (email, password) => {
    fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(res => {
       if (!res.ok) {
        throw new Error('shit')
       }
       return res.json()
    })
    
    .then(data => {
        if (data.success) {
            sessionStorage.setItem('token', data.token);
            TOKEN = data.token;

        } else {
            alert('shitt')
        }
        
    })
    
    .catch(err => {
        console.error(err)
        alert('error... shit')
    })
}

const verifyToken = async (token) => {
    try {
      const res = await fetch('http://localhost:3001/user/validatetoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to validate token');
      }
  
      const data = await res.json();
      return data.success; 
  
    } catch (err) {
      console.error(err);
      return null; 
    }
};  

module.exports = {
    handleLogin,
    getPosts,
    verifyToken
}