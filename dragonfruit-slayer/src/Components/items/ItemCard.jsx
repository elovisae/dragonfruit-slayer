import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

const ItemCard = (props) => {
  const item = props.item;
  const [quantity, setQuantity] = useState('1')
  const [validation, setValidation] = useState('hide')
  const [message, setMessage]       = useState('')

  const itemAdded = (message) => {
    setMessage(message)
    setValidation('')
    setTimeout (() => {
      setMessage('')
      setValidation('hide')
    }, 1000)
  }

  const updateUser = async (item) => {  
    const token = localStorage.getItem('token')
    const user = decodeToken(token)    

    if (!user) {
      console.log('cannot update user items')
      return
    }

    let url = 'http://localhost:5000/users/item';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userEmail:user.email,...item})
        // + user id
      })
      let data = await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleClick (){
    item.quantity = quantity;
    item.isInCart = true;
    try {
      let url = 'http://localhost:5000/items/' + item._id;
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      })  
      let data = await response.json()
      itemAdded(`${item.quantity} ${item.productName} added to cart`);
      updateUser(item)
    } catch (error) {
      console.log(error)
    }
    
  }

  async function ProductClick (){
    try {
      let url = 'http://localhost:5000/items/' + item._id;
      let response = await fetch(url)  
      let data = await response.json()
console.log(data);
    } catch (error) {
      console.log(error)
    }
    
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

          <div className='add-to-cart'>
                    <Link to="/produkt"><button onClick={ProductClick} className='buy-btn'>Mer info</button></Link>
          </div>
          
        </div>
    </div>
  )
}

export default ItemCard