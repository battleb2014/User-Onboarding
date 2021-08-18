import React from 'react';

const Form = (props) => {

    const {
        values,
        submit,
        change,
        disabled,
        errors
    } = props;

    const onSubmit = event => {
        event.preventDefault();
        submit();
    }

    const onChange = event => {
        const { name, value, checked, type } = event.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change( name, valueToUse );
    }

    return (
            <form className = 'form' onSubmit = { onSubmit }>
                <div className = 'errors'>
                    <div>{ errors.name }</div>
                    <div>{ errors.email }</div>
                    <div>{ errors.password }</div>
                    <div>{ errors.terms }</div>
                </div>
                <label>Name:
                    <input
                        value = { values.name }
                        type="text"
                        name="name"
                        placeholder="Name"
                        maxLength="30"
                        onChange = { onChange }
                    />
                </label><br />

                <label>Email:
                    <input
                        value = { values.email }
                        type="email"
                        name="email"
                        maxLength="50"
                        placeholder="email"
                        onChange = { onChange }
                    />
                </label><br />

                <label>Password:
                    <input
                        value = { values.password }
                        type="password"
                        name="password"
                        placeholder="password"
                        maxLength="30"
                        onChange = { onChange }
                    />
                </label><br />

                <label>Accept the terms of use
                    <input
                        value = { values.terms }
                        type="checkbox"
                        name="terms"
                        checked = { values.terms }
                        onChange = { onChange }
                    />
                </label><br />

                <div className = 'submit'>
                    <button disabled = { disabled }>Submit</button>
                </div>
            </form>
    )
}

export default Form;