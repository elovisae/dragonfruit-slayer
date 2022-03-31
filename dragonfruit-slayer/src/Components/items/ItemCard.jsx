import React from 'react'
import Photo from './Photo'

const ItemCard = (props) => {
  return (
    <div className='card'>
        <Photo img={props.img}/>
        <div className="item-description">
            <h3>{props.productName}</h3>
            <p>{props.bio}</p>
            <p>{props.prize}</p>
            <p>{props.size}</p>
        </div>
    </div>
  )
}

export default ItemCard