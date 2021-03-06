import React from 'react'
import {useState} from 'react'
import '../general/main.css'
import Nav from '../general/Nav';
import Footer from '../general/Footer';
import {useNavigate } from 'react-router-dom'


const Login = () => {

    let navigate = useNavigate()

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
     event.preventDefault()   
     const response = await fetch('http://localhost:5000/users/login',{
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             email,
             password,
         }),
     })

     const data = await response.json()
     console.log(data)
     if(data.user) {
        localStorage.setItem('token', data.user)
        alert('Login successful')
        navigate("/welcome")
       
     } else {
         alert('User not found. Please Register.')
         navigate("/register")
     }
    }

    return (
        <>
        <Nav/>
        <div>
            <h1> Login</h1>
            <form onSubmit={loginUser}>
                <div className='login-box'>
                 <input 
                value={email}
                id='emailInput'
                onChange={(e)=> setEmail(e.target.value)}
                type="email" 
                placeholder="Email" 
                /><br />
                <input 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                type="password" 
                placeholder="Password"                     
                /><br />
                <input type="submit" value= "Login"  />
                </div>
            </form>
        </div>
        <Footer />
     </>
    )
}
export default Login