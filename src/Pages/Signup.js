import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '../Context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {



    const Navigate = useNavigate  ();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const showToast = useToast();
  const API_URL = process.env.REACT_APP_BACKEND_URL;
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        Navigate('/')
    }
},[Navigate])

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      if(response){
        showToast('Signup Successful', 'success');
        setName('')
        setEmail('')
        setPassword('')

      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        showToast('Email already exists', 'error');
      } else {
        showToast('Signup failed', 'error');
      }
    }
  };

  return (


    <div className="w-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image"/>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form  onSubmit={handleSignup}>
              <div className="divider d-flex align-items-center my-4">
              </div>
              <div className=" form-outline mb-4">
            <input          type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded shadow appearance-none"
              placeholder="Enter Your name"
            />
          </div>
              <div className="form-outline mb-4">
              <input
             type="email"
             id="email"
             value={email}
            onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded shadow appearance-none"
              placeholder="Your email"
            />
              </div>
              <div className="form-outline mb-3">
               
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded shadow appearance-none"
                  placeholder="Enter Your password"
                />
              </div>
              <div className="text-center text-lg-start mt-6 pt-2">
                <button type="submit" className="w-full py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-700">Sign Up</button>
                <p className="small fw-bold mt-2 pt-1 mb-4 "> Already a Member?<Link to={'/login'} className='text-red-600'>Log In</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default Signup;
