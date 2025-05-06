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
    console.log("Login function called");
    fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        mode: 'cors'
    }).then(res => {
       if (!res.ok) {
        throw new Error('Wrong credentials')
       }
       return res.json()
    })
    
    .then(data => {
      console.warn(data);
        if (data.success === true) {
            console.log(data);
            sessionStorage.setItem('token', data.token);
        } else {
            alert('Wrong credentials')
        }
        
    })
    
    .catch(err => {
        console.error(err)
        alert('Error: ' + err.message)
    })
}

const handleRegister = (username, email, password) => {
  fetch('http://localhost:3001/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  }).then(res => {
    if (!res.ok) {
      throw new Error('error?')
    }
    return res.json()
  })

  .then(data => {
    if (data.success == true) {
      alert('success')
    }
  })

}

const handleTweetPost = (title, text) => {
  fetch("http://localhost:3001/posts/tweet", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: sessionStorage.getItem("token"), title, content: text})
  }).then(res => {
    if(!res.ok) {
      throw new Error("error?")
    }

  })
}

const handleTweetLike = (postId) => {
  fetch("http://localhost:3001/posts/like", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: sessionStorage.getItem("token"), postId })
  }).then(res => {
    if(!res.ok) {
      throw new Error("error?")
    }
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
    handleRegister,
    getPosts,
    verifyToken,
    handleTweetPost,
    handleTweetLike
}