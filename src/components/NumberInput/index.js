import React, {useState} from 'react';

const NumberInput = (props) => {
    const handleChange = (e) => {
        if (e.target.value === '') {
            props.onChange(null);
        } else {
            props.onChange(e.target.value);
        }
    };

    return (
        <div className='number-input'>
            <input
                type='number'
                value={props.value}
                placeholder={props.placeholder}
                onChange={handleChange}
            >

            </input>
        </div>
    );
};

export default NumberInput;