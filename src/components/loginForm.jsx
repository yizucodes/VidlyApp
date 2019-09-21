import React, { Component } from 'react';
import Form from "./common/form";
import Joi from "joi-browser";


class LoginForm extends Form {

    state = {
        data: { username: "", password: "" },
        errors: {},
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    //[name] is name set at runtime and will be the key 
    doSubmit = () => {
        //Call server, save changes
        console.log("submit");
    }



    validateProperty = ({ name, value }) => {

        //Check input field 
        if (name === 'username') {
            if (value.trim() === '') return 'Username is required';
        }

        if (name === 'password') {
            if (value.trim() === '') return 'Password is required';
        }

    }



    render() {


        return (

            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', "password")}
                    {this.renderButton("Login")}
                </form>
            </div >
        );
    }
}

export default LoginForm;