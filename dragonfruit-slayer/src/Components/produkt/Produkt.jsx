import React, {useEffect, useState} from 'react'
import Nav from '../general/Nav'
import Footer from '../general/Footer'


const Produkt = () => {
  const [item, setItem] = useState('')
  const params = new URLSearchParams(window.location.search)

   let id= params.get('id')
   useEffect(() =>{fetchItem()}, [])
   
async function fetchItem () {

  try{
    let response = await fetch('http://localhost:5000/items/' + id)
    console.log(response.statusText)
    let item = await response.json();
    setItem(item)

  }catch(error){
    console.log(error)
  }
}

  return (
    <>
    <Nav />
    <main>
     
        <div className='card'>
        <img src={`IMG/items/${item.image}`} alt={`product image of ${item.productName}`} className='produkt-img'/>
        <div>
          <div className="item-description">
              <h3>{item.productName}</h3>
              <p className="italic">{item.producer}</p>
              <p>Beskrivning: {item.bio}</p>
              <span>
                <p>{item.size} ml   </p>
                <p className="bold">{item.prize} SEK</p>
              </span>
              
          </div>
        </div>
    </div>
       
    </main>
    <Footer />
    </>
  )
}

export default Produkt