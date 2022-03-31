import React, { useEffect, useState } from 'react'
import './shoppingCart.css'
import '../general/main.css'
import Nav from '../general/Nav';
import Footer from '../general/Footer';
import CartItems from './CartItems';


const ShoppingCart = () => {
   const [items, setItems] = useState([]);
   useEffect(() => {fetchAllItems()}, [])

  async function fetchAllItems () {
    try{
      let response  = await fetch('http://localhost:5000/items')
      let items     = await response.json();

      let filteredItems = []
      items.map(item => {
         if(item.isInCart){
            filteredItems.push(item)
         }
      })
      setItems(filteredItems)
      
   }catch(error){
      console.log(error)
   }
}
function handleClick (){
   items.map(item => {
      item.quantity = "";
      item.isInCart = false;
      updateItem(item)
   })
   
}
async function updateItem (item) {
   let url = 'http://localhost:5000/items/' + item._id;
      console.log(url)
    
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      })  
      let data = await response.json()
      console.log(data.message)
      fetchAllItems()
}
  return (
     <>
        <Nav/>
         <h2>Kassa</h2>
         <article className='cart'>
             <section>
                <h3>Din varukorg:</h3>
                <div>
                  <CartItems items={items}/>
                </div>
             </section>
             <section>
                 <h3>Till betalning:</h3>
                 <button onClick={handleClick} className='black-btn'>Betala</button>
             </section>
         </article>
         <Footer />
     </>
  )
}

export default ShoppingCart