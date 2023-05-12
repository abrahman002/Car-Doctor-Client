import React, { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {

    const {login}=useContext(AuthContext)

    const handleSubmit=event=>{
        event.preventDefault()

        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;

        console.log(email,password)

        login(email,password)
        .then(result=>{
            const user=result.user;
             console.log(user)
        })
        .catch(error=>console.log(error))
    }
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">

                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-100">

                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <h1 className="text-3xl text-center font-bold">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </div>
                    </form>
                    <p className='text-center'>New to Car-Doctor?
                        <Link to='/signup' className=' text-orange-500'> Sign Up</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;