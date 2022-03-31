import React from 'react'
import CartItem from './CartItem'

const CartItems = (props) => {
    const items = props.items;
    // let sum = 0;
    const getSum = (sum) => {
      sum += sum;
      props.getTotalSum(sum)
    }
   
  return (
    <>
    {items.map((item) => 

        <CartItem 
        item={item}
        key={item._id}
        fetchFunction={props.fetchFunction}
        getSum={getSum}
        
        />
    )}
    </>
  )
}

export default CartItems