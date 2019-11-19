import React, {useState} from 'react';

const TextInput = (props) => {

    const handleChange = (e) => {
        if (e.target.value === '') {
            props.onChange(null);
        } else {
            props.onChange(e.target.value);
        }
    };

    return (
        <div className='text-input'>
            <input
                type='text'
                value={props.value}
                placeholder={props.placeholder}
                onChange={handleChange}
            >

            </input>
        </div>
    );
};

export default TextInput;