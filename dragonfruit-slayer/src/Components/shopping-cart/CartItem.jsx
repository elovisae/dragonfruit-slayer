import React, { useEffect } from 'react'
import Photo from '../../img/Photo'
import { useState } from 'react';

const CartItem = (props) => {
  const item = props.item;
  const [quantity, setQuantity] = useState(item.quantity);
  item.quantity = quantity;
  let number = parseInt(item.quantity)
  let prize   = parseInt(item.prize)
  let totalPrize = number*prize;
  return (
    <div className='cart-item'>
        <Photo img={item.img_link} class="cart-item-img"/>
        <div>
            <span><h3>{item.productName}</h3><p className="italic">{item.producer}</p></span>
            
            <p className="bold">{item.prize} SEK</p>
            <p >{item.size} ml</p>
            <div className='number'>
              <p>Quantity: {item.quantity}</p>
              <p className='bold'>Total prize: {totalPrize}</p>
            </div>
        </div>
    </div>
  )
}

export default CartItem