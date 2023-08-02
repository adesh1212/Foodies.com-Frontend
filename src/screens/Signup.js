import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../URI';

export default function Signup() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Sending form data to the backend
        const response = await fetch(`${BASE_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const res = await response.json()
        // console.log(res);
        
        if(res.success){
            toast.success("Signed in successfully");
            navigate('/login');
        }
        else{
            toast.error(res.message);
        }
    }


    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"> Name </label>
                        <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onchange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"> Email address </label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} required />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adress" className="form-label">
                            Address
                        </label>
                        <input type='text' className="form-control" id="adress" name='geolocation' value={credentials.geolocation} onChange={onchange} required />
                    </div>

                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>

                    <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
                </form>
            </div>
        </>
    )
}
