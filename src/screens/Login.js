import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatchCart } from '../components/ContextReducer';
import { BASE_URL } from '../URI';

export default function Login() {
  let {setEmail} = useDispatchCart()
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });


  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sending form data to the backend
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const res = await response.json()
    // console.log(res);
    if (res.success) {
      localStorage.setItem('userEmail', credentials.email);
      setEmail(credentials.email)
      localStorage.setItem('authToken', res.authToken);
      // console.log(localStorage.getItem('authToken'));
      // alert(res.message); 
      toast.success("Logged in successfully");
      navigate('/');
    }
    else {
      // alert(res.message); 
      toast.error(res.message);
    }


  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label"> Email address </label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} required />

          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} required />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>

          <Link to='/signup' className='m-3 btn btn-danger'>I am a new user</Link>
        </form>
      </div>
    </>
  )
}
