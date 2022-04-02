import React from 'react'
import {useState} from 'react'
import '../general/main.css'
import Nav from '../general/Nav';
import Footer from '../general/Footer';
import {useNavigate } from 'react-router-dom'


const Register = () => {

    let navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registeredUser(event) {
     event.preventDefault()   
     const response = await fetch('http://localhost:5000/users/register',{
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             name, 
             email,
             password,
         }),
     })

     const data = await response.json()
     console.log(data)
     if(data) {
        alert('You succesfully registered, please login')
        navigate("/login")
       
     }
    }

    return (
        <>
        <Nav/>
        <div>
            <h1>Register</h1>
            <form onSubmit={registeredUser}>
                <input 
                value={name}
                onChange={(e)=> setName(e.target.value)}
                type="text" 
                placeholder="Name"                    
                /> <br />
                <input 
                value={email}
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
                <input type="submit" value="Register"  />
            </form>
        </div>
        <Footer />
     </>
    )
}
export default Register