import React from 'react'
import { 
    blackOpium,
    armaniCode,
    olympea
} from './items/perfume-imgs'

const Photo = (props) => {
    
    switch(props.img) {
        case 'blackOpium':
        return (<img className={props.class} src={blackOpium} alt='item img'/>)
        case 'armaniCode':
        return (<img className={props.class} src={armaniCode} alt='item img'/>)
        case 'olympea':
        return (<img className={props.class} src={olympea} alt='item img'/>)

        default:
            return(<p>No img found</p>)
    }
}

export default Photo