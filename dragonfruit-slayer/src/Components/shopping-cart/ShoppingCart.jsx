import React from 'react'
import './shoppingCart.css'
import '../../general/main.css'
import { useNavigate, Link } from "react-router-dom";
import Nav from '../../general/Nav';
import Footer from '../../general/Footer';

const ShoppingCart = () => {
  return (
     <>
        <Nav/>
         <h2>Kassa</h2>
         <article className='cart'>
             <section>
                <h3>Din varukorg:</h3>
                <div>
                  items items items
                </div>
             </section>
             <section>
                 <h3>Till betalning:</h3>
                 <div>
                    Välj betalsätt:
                    kort, swish, kontant
                 </div>
             </section>
         </article>
         <Footer />
     </>
  )
}

export default ShoppingCart