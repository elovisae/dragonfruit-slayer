import React from 'react';
import ItemCard from './ItemCard';

const Items = (props) => {
    const items = props.items;
  return (
    <article>
        {items.map((item) => 
            <ItemCard 
            key={item._id}
            productName={item.productName}
            bio={item.bio}
            producer={item.producer}
            prize={item.prize}
            size={item.size}
            img={item.img_link}
            
            />
        )}
    </article>
  )
}

export default Items