import React from 'react';
import ItemCard from './ItemCard';

const Items = (props) => {
    const items = props.items;
  return (
    <>
        {items.map((item) => 
            <ItemCard 
            item={item}
            key={item._id}
            validation={props.validation}
            />
        )}
    </>
  )
}

export default Items