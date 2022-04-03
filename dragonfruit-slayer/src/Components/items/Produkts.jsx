import React from 'react';
import ProduktCard from './ProduktCard';

const Produkts = (props) => {
    const items = props.items;
  return (
    <>
        {items.map((item) => 
            <ProduktCard 
            item={item}
            key={item._id}
            validation={props.validation}
            />
        )}
    </>
  )
}

export default Produkts