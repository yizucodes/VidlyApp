import React, { Component } from 'react';
import Input from "./common/input";
import Joi from "joi-browser"

class LoginForm extends Component {

    state = {
        account: { username: "", password: "" },
        errors: {},
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.account, this.schema, options);
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

    //[name] is name set at runtime and will be the key 


    // const { account, errors } = this.state;

    // if (account.username.trim() === "")
    //     errors.username = "Username is required.";
    // if (account.password.trim() === "")
    //     errors.password = "Password is required.";

    // //Return array of error objects, if it's 0 then return null, otherwise return error message
    // return Object.keys(errors).length === 0 ? null : errors;


    handleSubmit = e => {
        e.preventDefault();

        //Get error object
        const errors = this.validate();
        console.log(errors);
        //Update state, rerender for error messages, if error object is false, give empty objects
        //ERROR object always needs to set to an OBJECT

        this.setState({ errors: errors || {} });
        //If no errors, return function
        if (errors) return;

        //Call server, save changes
        console.log("submit");
    };

    validateProperty = ({ name, value }) => {

        //Check input field 
        if (name === 'username') {
            if (value.trim() === '') return 'Username is required';
        }

        if (name === 'password') {
            if (value.trim() === '') return 'Password is required';
        }

    }

    handleChange = ({ currentTarget: input }) => {

        // //Clone errors of state object
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);

        // //If errorMessage is true, store error in errorMessage object, otherwise delete error Objects
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        // New account to clone account object
        const account = { ...this.state.account };
        account[input.name] = input.value;

        //Update state through via React
        this.setState({ account, errors });
    }


    render() {

        const { account, errors } = this.state;
        return (

            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        value={account.username}
                        onChange={this.handleChange}
                        name="username"
                        label="Username"
                        error={errors.username} />

                    <Input
                        value={account.password}
                        onChange={this.handleChange}
                        name="password"
                        label="Password"
                        error={errors.password}
                    />

                    <button
                        disabled={this.validate()}
                        className="btn btn-primary">Login</button>
                </form>
            </div >
        );
    }
}

export default LoginForm;