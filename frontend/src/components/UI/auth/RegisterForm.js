import './AuthForm.css';

const RegisterForm = (a) => {
    return (
        <form onSubmit={a.handleSubmit} className="auth-form">
          <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </div>
            <div className="form-actions">
                <button type="submit">Register</button>
            </div>
        </form>
    );
}

export default RegisterForm;