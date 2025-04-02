import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import { handleLogin, isLogged, setToken } from './APIController';
import { useLocation } from "react-router-dom";
import { useState } from 'react';

import SideNav from './components/UI/Menu';
import LoginForm from './components/UI/auth/LoginForm';
import RegisterForm from './components/UI/auth/RegisterForm';

function App() {
  const location = useLocation(); // current url path
  console.log(location)
  const [showPosts, setShowPosts] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    handleLogin(email, password);
    setShowPosts(true);
  };
  return (
    <div className="App">
      {location.pathname === "/register" ? 
        <RegisterForm /> : 
        <LoginForm handleSubmit={handleSubmit} />
      }
      <SideNav />
    </div>
  );
}

export default App;
