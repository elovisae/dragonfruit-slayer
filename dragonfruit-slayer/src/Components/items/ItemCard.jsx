import React from 'react'
import { useState } from 'react';

const ItemCard = (props) => {
  const item = props.item;
  const [quantity, setQuantity] = useState('1')

  async function handleClick (){
    item.quantity = quantity;
    item.isInCart = true;
    console.log(item)
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
  }
  
  return (
    <div className='card'>
        <img src={`IMG/items/${item.image}`} alt={`product image of ${item.productName}`} className='item-img'/>
        <div>
          <div className="item-description">
              <h3>{item.productName}</h3>
              <p className="italic">{item.producer}</p>
              <span>
                <p>{item.size} ml   </p>
                <p className="bold">{item.prize} SEK</p>
              </span>
              
          </div>
          <div className='add-to-cart'>
            <select name="quantity" onChange={(e) => {setQuantity(e.target.value)}}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
           </select>
            <button onClick={handleClick} className='buy-btn'>Köp</button>
          </div>
        </div>

    </div>
  )
}

export default ItemCard