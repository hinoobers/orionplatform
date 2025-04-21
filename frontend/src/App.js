import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import { handleLogin, isLogged, setToken, verifyToken } from './APIController';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

import SideNav from './components/UI/Menu';
import LoginForm from './components/UI/auth/LoginForm';
import RegisterForm from './components/UI/auth/RegisterForm';

function App() {
  const location = useLocation(); // current url path
  console.log(location)
  const [showPosts, setShowPosts] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    handleLogin(email, password);

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  

  useEffect(() => {
    const checkToken = async () => {
      console.log("Checking token");
      if(sessionStorage.getItem("token") !== null) {
        console.log("Token found");	
        const result = await verifyToken(sessionStorage.getItem("token"));
        console.log("result", result);
        if(result == false) {
          window.location.href = "/login";
        } else {
          console.log("Token valid");
          setShowPosts(true);
        }
      } else {
        window.location.href = "/login";
      }
    }

    if(location.pathname !== "/login") {
      checkToken();
    }

  }, []);

  return (
    <div className="App">
    {location.pathname === '/login' && <LoginForm handleSubmit={handleSubmit} />}
    {location.pathname === '/register' && <RegisterForm handleSubmit={handleSubmit} />}
    <SideNav />
    {showPosts && <PostList />}
    </div>
  );
}

export default App;
