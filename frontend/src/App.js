import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';
import { handleLogin, isLogged, setToken } from './APIController';
import { useState } from 'react';
import SideNav from './components/UI/Menu';
import LoginForm from './components/UI/auth/LoginForm';
function App() {
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
      <LoginForm handleSubmit={handleSubmit} />
      <SideNav />
    </div>
  );
}

export default App;
