import React from 'react';

const Checkbox = (id, label, ...props) => (
    <label htmlFor={id} className="checkbox">
        <input type="checkbox" className="checkbox-input" id={id} {...props}/>
        <span className="checkbox-check material-icons" />

        <div className="checkbox-label">{label}</div>
    </label>
);

export default Checkbox;