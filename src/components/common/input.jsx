import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
    return (<div className="form-group">
        <label htmlFor={name}>{label}</label>

        {/* Rest paremeter includes other parameters other than name, label, error */}
        <input
            {...rest} name={name} id={name} className="form-control"
        />

        {/* Conditional rendering, render error message if error object is true */}
        {error && <div className="alert alert-danger">{error}</div>}
    </div>

    );
}

export default Input;