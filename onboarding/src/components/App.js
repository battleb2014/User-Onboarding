import React, { useState, useEffect } from 'react';
import axios from 'axios';
import schema from '../validation/formSchema';
import * as yup from 'yup';
import Form from './Form';
import '../App.css';
import User from './User';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: ''
}

const initialUsers = [];
const initialDisabled = true;

function App() {

  const [ users, setUsers ] = useState( initialUsers );
  const [ formValues, setFormValues ] = useState( initialFormValues );
  const [ formErrors, setFormErrors ] = useState( initialFormErrors );
  const [ disabled, setDisabled ] = useState( initialDisabled );

  const getUsers = () => {
    axios.get( 'https://reqres.in/api/users' )
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error(err))
  }

  const postNewUser = newUser => {
    axios.post( 'https://reqres.in/api/users', newUser )
      .then(res => {
        setUsers([ res.data, ...users ]);
        console.log(users);
      })
      .catch(err => console.error(err))

      setFormValues(initialFormValues);
  }

  const validate = ( name, value ) => {
    yup.reach( schema, name )
      .validate( value )
      .then(() => setFormErrors({ ...formErrors, [ name ]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [ name ]: err.errors[ 0 ] }))
  }

  const inputChange = ( name, value ) => {
    validate( name, value );
    setFormValues({
      ...formValues,
      [ name ]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled( !valid ))
  })

  return (
    <div className="App">
      <header><h1>Onboarding</h1></header>

      <Form
        values = { formValues }
        submit = { formSubmit }
        change = { inputChange }
        disabled = { disabled }
        errors = { formErrors }
      />

      {/* {
        users.map(user => {
          return (
            <User key = { User.id } details = { user } />
          )
        })
      } */}

    </div>
  );
}

export default App;
