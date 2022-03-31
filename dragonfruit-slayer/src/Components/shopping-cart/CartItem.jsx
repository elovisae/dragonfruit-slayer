import React, { useEffect } from 'react'
import { useState } from 'react';

const CartItem = (props) => {
  console.log(props.function)
  const item = props.item;
  const [quantity, setQuantity] = useState(item.quantity);
  item.quantity = quantity;
  let number = parseInt(item.quantity)
  let prize   = parseInt(item.prize)
  let totalPrize = number*prize;

  const handleClick = async () => {
    item.quantity = '';
    item.isInCart = false;

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
    props.function()
  }

  return (
    <div className='cart-item'>
      <img src={`IMG/items/${item.image}`} alt={`The product picture for ${item.productName}`} className='cart-item-img'/>
        <div>
            <span><h3>{item.productName}</h3><p className="italic">{item.producer}</p></span>
            
            <p className="bold">{item.prize} SEK</p>
            <p >{item.size} ml</p>
            <div className='number'>
              <p>Quantity: {item.quantity}</p>
              <p className='bold'>Total prize: {totalPrize}</p>
            </div>
        </div>
        <button onClick={() => handleClick()} className='black-btn'>Ta bort</button>
    </div>
  )
}

export default CartItem