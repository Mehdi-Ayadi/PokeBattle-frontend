import React from 'react';

const Scroll = (props) => {
    return (
        <div className='Scroll' style= {{
            overflowX: 'hidden', 
            OverflowY: 'hidden',
            border: '5px solid', 
            height: '800px',
            alignItems: 'center'
            }}>
            {props.children}      
        </div>
    )
}

export default Scroll