import React from 'react';

const price = ( props ) => {
    return (
        <div>
            <h5>{props.type}</h5>
            <h5>${props.price}</h5>
        </div>
    )
};

export default price;