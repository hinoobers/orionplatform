import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import { handleLogin, handleRegister, isLogged, setToken, verifyToken } from './APIController';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

import SideNav from './components/UI/Menu';
import LoginForm from './components/UI/auth/LoginForm';
import RegisterForm from './components/UI/auth/RegisterForm';
import TweetModal from './components/TweetModal';

function App() {
  const location = useLocation(); // current url path
  console.log(location)
  const [showPosts, setShowPosts] = useState(false);

  const handleSubmit_login = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    handleLogin(email, password);
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  };

  const handleSubmit_register = (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    handleRegister(username, email, password)
    setTimeout(() => {
      window.location.href = '/login'
    }, 1000)
  }

  useEffect(() => {
    const checkToken = async () => {
      console.log("Checking token");
      if(sessionStorage.getItem("token") !== null) {
        console.log("Token found");	
        const result = await verifyToken(sessionStorage.getItem("token"));
        console.log("result", result);
        if (result == false) {
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

  const [tweetModalOpen, setTweetModalOpen] = useState(false);

  const handleClose = () => {
    setTweetModalOpen(false);
  }

  return (
    <div className="App">
    <TweetModal isOpen={tweetModalOpen} handleClose={handleClose} ></TweetModal>
    {location.pathname === '/login' && <LoginForm handleSubmit={handleSubmit_login} />}
    {location.pathname === '/register' && <RegisterForm handleSubmit={handleSubmit_register} />}
    <SideNav tweetModal={setTweetModalOpen} isTweetModalOpen={tweetModalOpen}/>
    {showPosts && <PostList />}
    </div>
  );
}

export default App;