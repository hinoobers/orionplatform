import logo from './logo.svg';
import './App.css';

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    fetch('http://192.168.45.126:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(data => {
      console.log(data);
    });
  };
  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
