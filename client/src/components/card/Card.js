import React from 'react';
import "../card/Card.css";

function Card({ children, cardClass }) {
    return (
        <div className={`form-container ${cardClass}`}>
           
            {children}
        </div>
    );
}

export default Card;
