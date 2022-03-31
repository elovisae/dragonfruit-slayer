import React from 'react'
import CartItem from './CartItem'

const CartItems = (props) => {
    const items = props.items;
  return (
    <>
    {items.map((item) => 
        <CartItem 
        item={item}
        key={item._id}
        function={props.function}
        
        />
    )}
    </>
  )
}

export default CartItems