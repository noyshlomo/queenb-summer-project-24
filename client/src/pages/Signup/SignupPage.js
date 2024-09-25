import { useState } from 'react';
import './Signup.css'; // Importing the CSS file for the signup form
import { useSignup } from "../../hooks/useSignup";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const {signup , error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email,password,userName,phone)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
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
            <label>Username:</label>
             <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
             <label>Phone Number:</label>
             <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className = "error">{error}</div>}
            </form>
    )
}

export default Signup
