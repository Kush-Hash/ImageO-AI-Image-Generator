import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState('Login');
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Debug: Log the backend URL
        console.log('Backend URL:', backendUrl);

        try {
            if (state === 'Login') {
                const loginUrl = backendUrl + '/api/user/login';
                console.log('Login URL:', loginUrl);

                const { data } = await axios.post(loginUrl, { email, password });

                if (data.success && data.token) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                } else {
                    console.log(data.message);
                    toast.error(data.message || "Something went wrong");
                }

            } else {
                const registerUrl = backendUrl + '/api/user/register';
                console.log('Register URL:', registerUrl);

                const { data } = await axios.post(registerUrl, { name, email, password });

                if (data.success && data.token) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                } else {
                    console.log(data.message);
                    toast.error(data.message || "Something went wrong");
                }
            }

        } catch (error) {
            console.log('Full error:', error);
            console.log('Error message:', error.message);
            console.log('Error response:', error.response);

            if (error.response) {
                // Server responded with error status
                toast.error(`Server Error: ${error.response.status} - ${error.response.data?.message || error.message}`);
            } else if (error.request) {
                // Request was made but no response received
                toast.error('No response from server. Please check if the backend is running.');
            } else {
                // Something else happened
                toast.error(error.message);
            }
        }
    }

    // useEffect to disable body scroll when the login component is mounted
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset' // Re-enable scrolling when component unmounts
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-100 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <motion.form onSubmit={onSubmitHandler} action="" className='relative p-10 bg-white rounded-xl text-slate-500'
                initial={{ opacity: 0, x: 250, y: -100 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                animate={{ duration: 1 }}
            >

                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' &&
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                        <i className="fa fa-user"></i>
                        <input
                            type="text"
                            placeholder='Full Name'
                            className='outline-none text-sm'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                }

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.email_icon} alt="" className='w-4' />
                    <input
                        type="email"
                        placeholder='Email id'
                        required
                        className='outline-none text-sm'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.lock_icon} alt="" className='w-4' />
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        className='outline-none text-sm'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <p className='text-sm text-stone-950 my-4 mx-2 cursor-pointer'>Forgot password?</p>

                <button className='bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer hover:scale-[1.01]'>
                    {state === "Login" ? "Login" : 'Create Account'}
                </button>

                {
                    state === "Login" ?
                        <p className='mt-5 text-center'>
                            Don't have an account ?
                            <span
                                className='text-blue-600 cursor-pointer'
                                onClick={() => (setState('Sign Up'))}
                            >
                                Register
                            </span>
                        </p>
                        :
                        <p className='mt-5 text-center'>
                            Already have an account ?
                            <span className='text-blue-600 cursor-pointer'
                                onClick={() => (setState('Login'))}
                            >
                                Login
                            </span>
                        </p>
                }

                <img
                    onClick={() => setShowLogin(false)} src={assets.cross_icon}
                    alt=""
                    className='absolute top-5 right-5 cursor-pointer'
                />
            </motion.form>
        </div>
    )
}

export default Login