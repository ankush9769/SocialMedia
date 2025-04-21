import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmitHandle = async (e) => {
    e.preventDefault()
    try {
      await register(username, email, password);
      navigate('/login');
    }
    catch (err) {
      console.log(err);
      setError(err.message || 'registration failed');
    }
  }
  return (
    <div className='container' style={{ color: "#d1cdcb" }}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmitHandle}>
        <div className="mb-3">
          <label  className="form-label">Username</label>
          <input type="text" className="form-control bg-dark text-white" id="exampleInputUsername" aria-describedby="usernameHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label  className="form-label">Email address</label>
          <input type="email" className="form-control bg-dark text-white" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input type="password" className="form-control bg-dark text-white" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Register
