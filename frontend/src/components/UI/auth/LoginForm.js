import './AuthForm.css';

const LoginForm = (a) => {
    return (
        <form onSubmit={a.handleSubmit} className="auth-form">
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </div>
            <div className="form-actions">
                <button type="submit">Login</button>
            </div>
        </form>
    );
}

export default LoginForm;