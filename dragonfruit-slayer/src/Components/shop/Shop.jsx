import React from 'react'
import Nav from '../general/Nav'
import Footer from '../general/Footer'
import Items from '../items/Items'
import './shop.css'

const Shop = (props) => {
    const items = props.items;
  return (
    <>
    <Nav />
    <main>
        <article className='shop-all-wrapper'>
            <Items items={items} />
        </article>
    </main>
    <Footer />
    </>
  )
}

export default Shop