import React from 'react'
import { Link } from 'react-router-dom';

const ProduktCard = (props) => {
  const item = props.item;



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
        </div>
    </div>
  )
}

export default ProduktCard