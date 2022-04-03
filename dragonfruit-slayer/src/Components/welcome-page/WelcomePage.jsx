import React from "react";
import { decodeToken } from "react-jwt";
import {useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { useState } from "react";



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
       <div>
           <h1>Welcome</h1>
           <h2>Your previous purchases: {purchases || 'No previous purchases found'}</h2>
       </div>
)}

export default WelcomePage