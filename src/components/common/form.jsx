import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from "./input"

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema);

        //Return error message if there is an error
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();

        //Get error object
        const errors = this.validate();

        //Update state, rerender for error messages, if error object is false, give empty objects
        //ERROR object always needs to set to an OBJECT

        this.setState({ errors: errors || {} });
        //If no errors, return function
        if (errors) return;

        this.doSubmit();

    };

    handleChange = ({ currentTarget: input }) => {

        // //Clone errors of state object
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);

        // //If errorMessage is true, store error in errorMessage object, otherwise delete error Objects
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        // New data to clone data object
        const data = { ...this.state.data };
        data[input.name] = input.value;

        //Update state through via React
        this.setState({ data, errors });
    }

    renderButton(label) {
        return (
            <button
                disabled={this.validate()}
                className="btn btn-primary">{label}
            </button>
        )
    }

    renderInput(name, label, type = "text") {

        const { data, errors } = this.state;

        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

}

export default Form;