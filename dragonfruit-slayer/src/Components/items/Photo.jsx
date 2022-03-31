import React from 'react'
import { 
    blackOpium 
} from '../../img/items/perfume-imgs'

const Photo = (props) => {
    switch(props.img) {
        case 'blackOpium':
        return (<img className='item-img' src={blackOpium} alt='item img'/>)

        default:
            return(<p>No img found</p>)
    }
}

export default Photo