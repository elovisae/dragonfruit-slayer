import React, { useEffect, useState } from 'react'
import './shoppingCart.css'
import '../general/main.css'
import Nav from '../general/Nav';
import Footer from '../general/Footer';
import CartItems from './CartItems';


const ShoppingCart = () => {
   const [items, setItems] = useState([]);
   const [totalSum, setTotalSum] = useState(0)
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
      setTotalSum(0)
      
   }catch(error){
      console.log(error)
      }
   }
   function handleClick (){
      console.log(items)
      fetch('http://localhost:5000/users/purchases', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
         }, body: JSON.stringify({purchases: items}),
         
      })
      .then(response => response.json())
      .then(data => {
         console.log('Success:', data);
      })
      .catch((error) => {
         console.error('Error:', error);
      });
      
      console.log(totalSum)
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
   const getTotalSum = (sum) => {
      setTotalSum(sum)
   }
   
   console.log(items.length)
   if(items.length === 0){
      return(
         <>
            <Nav/>
             <h2>Kassa</h2>
             <main>
               <article className='cart'>
                  <section>
                     <h3>Din varukorg:</h3>
                     <div>
                        <p>No items</p>
                     </div>
                  </section>
                  <section className='pay-section'>
                  <div>
                        <p>Ordersumma:</p>
                        <p>{` ${totalSum} SEK`}</p>
                     </div>
                     <div>
                        <p>Leverans</p>
                        <p>39.90 SEK</p>
                     </div>
                     <div className='total-sum-div'>
                        <p className='bold'>Totalsumma</p>
                        <p className='bold'>{Math.round(totalSum + 39.90)+ ' SEK'}</p>
                     </div>
                     <button onClick={handleClick} className='black-btn'>Fortsätt till kassan</button>
                  </section>
               </article>
             </main>
             <Footer />
         </>
      )
   } else{
      return (
         <>
            <Nav/>
             <h2>Kassa</h2>
             <main>
               <article className='cart'>
                  <section>
                     <h3>Din varukorg:</h3>
                     <div>
                        <CartItems getTotalSum={getTotalSum} fetchFunction={fetchAllItems} items={items}/>
                     </div>
                  </section>
                  <section className='pay-section'>
                     <div>
                        <p>Ordersumma:</p>
                        <p>{` ${totalSum} SEK`}</p>
                     </div>
                     <div>
                        <p>Leverans</p>
                        <p>39.90 SEK</p>
                     </div>
                     <div className='total-sum-div'>
                        <p className='bold'>Totalsumma</p>
                        <p className='bold'>{Math.round(totalSum + 39.90)+ ' SEK'}</p>
                     </div>
                     <button onClick={handleClick} className='black-btn'>Fortsätt till kassan</button>
                  </section>
               </article>
             </main>
             <Footer />
         </>
      )
   }      

  
}

export default ShoppingCart