import React from 'react'
import './shoppingCart.css'
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
    const navigate = useNavigate();
  return (
     <div id="wrapper">
         <nav className="nav">
            <p onClick={() => {navigate(-1)}}> &lt; Back</p>
            <h1 onClick={() => {navigate('/')}}>SLAYER</h1>
         </nav>
         <h2>Kassa</h2>
         <article className='cart'>
             <section>
                <h3>Din varukorg:</h3>
                <div>

                </div>
             </section>
             <section>
                 <h3>Till betalning:</h3>
             </section>
         </article>
         <footer>
            <div>Contact us</div>
            <div>Contact us</div>
            <div>Contact us</div>
         </footer>
     </div>
  )
}

export default ShoppingCart