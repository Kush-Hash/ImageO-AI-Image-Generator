import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState('Login')
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // Clear inputs when switching Login / Register
    useEffect(() => {
        setName('')
        setEmail('')
        setPassword('')
    }, [state])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (state === 'Login') {
                const loginUrl = backendUrl + '/api/user/login'
                const { data } = await axios.post(loginUrl, { email, password })

                if (data.success && data.token) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message || 'Something went wrong')
                }

            } else {
                const registerUrl = backendUrl + '/api/user/register'
                const { data } = await axios.post(registerUrl, { name, email, password })

                if (data.success && data.token) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message || 'Something went wrong')
                }
            }
        } catch (error) {
            if (error.response) {
                toast.error(`Server Error: ${error.response.status} - ${error.response.data?.message || error.message}`)
            } else {
                toast.error('No response from server. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    // Disable body scroll when modal open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-100 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <motion.form
                onSubmit={onSubmitHandler}
                className='relative p-10 bg-white rounded-xl text-slate-500'
                initial={{ opacity: 0, x: 250, y: -100 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                animate={{ duration: 1 }}
            >

                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && (
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                        <i className="fa fa-user"></i>
                        <input
                            type="text"
                            placeholder='Full Name'
                            className='outline-none text-sm'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.email_icon} alt="" className='w-4' />
                    <input
                        type="email"
                        placeholder='Email id'
                        required
                        className='outline-none text-sm'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.lock_icon} alt="" className='w-4' />
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        className='outline-none text-sm'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <p className='text-sm text-stone-950 my-4 mx-2 cursor-pointer'>Forgot password?</p>

                <button
                    disabled={loading}
                    className={`bg-blue-600 w-full text-white py-2 rounded-full 
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
                >
                    {loading
                        ? state === 'Login'
                            ? 'Logging in...'
                            : 'Registering...'
                        : state === 'Login'
                            ? 'Login'
                            : 'Create Account'
                    }
                </button>

                {state === 'Login' ? (
                    <p className='mt-5 text-center'>
                        Don&apos;t have an account ?
                        <span
                            className='text-blue-600 cursor-pointer ml-1'
                            onClick={() => setState('Sign Up')}
                        >
                            Register
                        </span>
                    </p>
                ) : (
                    <p className='mt-5 text-center'>
                        Already have an account ?
                        <span
                            className='text-blue-600 cursor-pointer ml-1'
                            onClick={() => setState('Login')}
                        >
                            Login
                        </span>
                    </p>
                )}

                <img
                    src={assets.cross_icon}
                    alt=""
                    onClick={() => setShowLogin(false)}
                    className='absolute top-5 right-5 cursor-pointer'
                />
            </motion.form>
        </div>
    )
}

export default Login
