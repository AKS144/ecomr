import axios from 'axios';
import React, {useState} from 'react';
import Navbar from '../../../layouts/frontend/Navbar';


function Register() {

    const [registerInput, setRegister] = useState({
        name: '',
        email:'',
        password:''
    });

    const handleInput = (e) =>{
        e.presist();
        setRegister({...registerInput,[e.target.name]: e.target.value });
    };

    const registerSubmit = (e) =>{
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`http://localhost:8000/api/register`, data).then(res => {

            });
        });


    }

    return(
        <div>
            <Navbar />
              <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="name" className="form-control" onChange={handleInput} value={registerInput.name} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email Id</label>
                                        <input type="email" name="email" className="form-control" onChange={handleInput} value={registerInput.email} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" className="form-control" onChange={handleInput} value={registerInput.password} />
                                    </div>
                                   
                                    <div className="form-group mb-3">
                                      <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
        </div>
      
      
    )
}

export default Register; 