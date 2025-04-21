import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("successfully logged in");
            navigate('/');
        }
        catch (err) {
            setError(err.message || "login failed");
        }

    }

    return (
        <div className='container ' style={{ color: "#d1cdcb" }}> 
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmitHandle}>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control bg-dark text-white" id="exampleInputEmail1" aria-describedby="emailHelp"  value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control bg-dark text-white" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
