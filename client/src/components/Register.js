import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const Register = (setAuth) => {

  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    nickname: '',
    age: '',
    email: '',
    password: '',
  });

  const { first_name, last_name, nickname, age, email, password } = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { first_name, last_name, nickname, age, email, password };
      const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body : JSON.stringify(body)
        }
      );

      const parseRes = await response.json();
      
      if(parseRes.token) {
      localStorage.setItem('token', parseRes.token);

      setAuth(true);
      toast.success('Registered successfully');
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <h1 className='text-center my-5'>Register</h1>
      <form onSubmit={ onSubmitForm }>
      <input
         type='text' 
         name='first_name' 
         placeholder='Enter first name' 
         className='form-control my-3' 
         value={ first_name }
         onChange={e => onChange(e)}
        />
        <input
         type='text' 
         name='last_name' 
         placeholder='Enter last name' 
         className='form-control my-3' 
         value={ last_name }
         onChange={e => onChange(e)}
        />
      <input
         type='text' 
         name='nickname' 
         placeholder='Enter your nickname' 
         className='form-control my-3'
         value={ nickname }
         onChange={e => onChange(e)}
        />
        <input
         type='text' 
         name='age' 
         placeholder='Enter your age' 
         className='form-control my-3' 
         value={ age }
         onChange={e => onChange(e)}
        />
         <input
         type='email' 
         name='email' 
         placeholder='abc@example.com' 
         className='form-control my-3'
         value={ email }
         onChange={e => onChange(e)}
        />
        <input
         type='password' 
         name='password' 
         placeholder='Enter your password' 
         className='form-control my-3'
         value={ password }
         onChange= {e => onChange(e)} 
        />
        <button className='btn btn-success btn-block'>Submit</button>
      </form>
      <Link to='/login'>Login</Link>
    </Fragment>
  );
};

export default Register;
