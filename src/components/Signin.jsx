import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'



const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { signIn, userdata } = UserAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        try {
            setLoading(true)
            await signIn(email, password)
            navigate('/main')
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }



    return (
        <div className='max-w-[700px] mx-auto my-20 p4'>
            {/* <div style="margin-top: 10"></div> */}

            <div className="flex flex-col px-20 py-10">
                <h2 className='text-6xl text-center font-bold py-3 underline'>Login</h2>
            </div>

            <h1 className='text-2xl font-bold py-2'>Login in to your account</h1>


            {/* sign up form */}
            {error !== '' && <p className='py-2 text-red-500'>{error}</p>}

            <form onSubmit={handleLogin}>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Email Address</label>
                    <input placeholder='enter email address' onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Password</label>
                    <input placeholder='enter your password' onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
                </div>

                <button className='border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-center text-white shadow-lg rounded-md'>{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>


            <div className="custom-shape-divider-bottom-1665696366">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}

export default Signin
