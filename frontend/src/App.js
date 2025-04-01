import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import { setToken } from './APIController';
import { useState } from 'react';
import SideNav from './components/UI/Menu';
function App() {
  const [showPosts, setShowPosts] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    fetch('http://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(data => {
      sessionStorage.setItem('token', data.token);
      setToken(data.token);
      setShowPosts(true);
    });
  };
  return (
    <div className="App">
      {!setShowPosts ? (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <button type="submit">Login</button>
      </form>) : (<PostList />)}
      <SideNav />
    </div>
  );
}

export default App;
