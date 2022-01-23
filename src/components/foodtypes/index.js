import React from 'react'

const foodTypes = {
    0: 1,
    1: 5,
    2: 10
}



export default function FoodTypes() {
    return (
        <ul className='foodtypes'>
           {Object.entries(foodTypes).map(el => {
               return (
                    <li key={el[1]} className='foodtype'>
                        <div className={`food${el[1]}`} style={{marginRight: '5px'}}></div>
                        <span>{el[1]}   {(el[1] > 1) ? 'points' : 'point'}</span>
                    </li>
               )
           })}  
        </ul>
    )
}
