import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './main.css'
import cart from '../../img/shopping-bag.png'
import user from '../../img/user.png'
import signup from '../../img/signup.webp'
const Nav = () => {
    const navigate = useNavigate()
    
  return (
    <header>
            <nav>
                <p className="link" onClick={() => {navigate(-1)}}> &lt; BACK</p>
                <h1><Link to="/" className='link title'>SLAYER</Link></h1>
                <div>
                    <Link to="/register"><img className="icon signup-icon" src={signup} alt="" /></Link>
                    <Link to="/login"><img className="icon user-icon" src={user} alt="" /></Link>
                    <Link to="/cart"><img className="icon" src={cart} alt="" /></Link>
                </div>
            </nav>
        </header>
  )
}

export default Nav