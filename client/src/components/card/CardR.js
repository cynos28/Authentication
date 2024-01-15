import React from 'react'
import {} from '../card/CardR.css'


function CardR({ children, cardClass }) {
    return (
        <div className={`form-containers ${cardClass}`}>
           
            {children}
        </div>
    );
}

export default CardR