import { useState } from 'react';
import './Login.css'; // Importing the CSS file for the Login form
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email,password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
             <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>password:</label>
             <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
           
            <button type="submit" disabled={isLoading}>Login</button>
            {error && <div className= 'error'>{error}</div>}
            </form>
    )
}

export default Login;
