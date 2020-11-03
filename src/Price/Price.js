import React from 'react';

const price = ( props ) => {
    return (
        <div>
            <h3>{props.type}</h3>
            <h3>${props.price}</h3>
        </div>
    )
};

export default price;