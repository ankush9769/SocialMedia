import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { logout, user } = useAuth()
  return (

    <nav className="navbar " style={{background:"#121414" }}>
      <div className="container-fluid"  style={{background:"#121414"}}>
        <Link to="/" style={{textDecoration: "none" }}><b style={{ color: "blue", fontSize: "2rem",background:"#121414"}}>WorldThread🌍</b></Link>
        <form className="d-flex gap-2" role="search">
          {user ? (
            <>
              <Link to="/profile"><button className="btn btn-outline-success" type="submit">Profile</button></Link>
              <button className="btn btn-outline-danger" type="submit" onClick={logout}>Logout</button></>
          ):(
          <>
            <Link to="/login" className="btn btn-outline-primary">Login</Link> 
            <Link to="/register" className="btn btn-outline-success">Register</Link>
          </>
        )}
        </form>
      </div>
    </nav>

  )
}

export default Navbar
