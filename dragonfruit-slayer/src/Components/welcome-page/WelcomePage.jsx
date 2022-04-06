import React from "react";
import { decodeToken } from "react-jwt";
import {useNavigate, Link } from 'react-router-dom'
import { useEffect } from "react";
import { useState } from "react";
import Nav from '../general/Nav'
import Footer from '../general/Footer'
import '../general/main.css'



const WelcomePage = () => {

    let navigate = useNavigate()
    const [purchases, setPurchases] = useState('')

    async function populatePurchases() {
        const req = await fetch('http://localhost:5000/users/purchases',{
        headers: {
            'x-access-token': localStorage.getItem('token'),
         },
        })
        const data = req.json()
        if(req.ok){
            setPurchases(data.purchases)
        }else {
            alert(data.error)
        }
    }

    useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
        const user = decodeToken(token)
        console.log(user)
        if(!user) {
            localStorage.removeItem('token')
            navigate('/login', { replace: true })
        } else{
            populatePurchases()
        }
      }
    }, [])

    return (
        <>
        <Nav />
       <div>
       
           <h1>Welcome</h1>
           <h3>Your previous purchases: <br/>
            {purchases || 'No previous purchases found'}</h3>

            <h3><Link to="/" className='link title'>Continue to SHOP</Link></h3>

       </div>
       <Footer />
    </>
)}

export default WelcomePage