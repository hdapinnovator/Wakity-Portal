import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Signup = () => {
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirm: '',
        rank: 0,
        forceNo: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { createUser } = UserAuth()


    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (data.confirm === '' || data.password === '' || data.lname === '' || data.fname === '') {
            setError('Please make sure all field are populated')
        } else {
            if (data.password !== data.confirm) {
                setError('Password do not match')
            } else {
                setLoading(true)
                try {
                    await createUser(data)
                    setError('Your account was created with success. Please contact your admin to approve your account.')
                    setTimeout(() => {
                        navigate('/')
                    }, 5000);
                } catch (error) {
                    setLoading(false)
                    setError(error.message)
                }
            }

        }
    }


    return (
        <div className='max-w-[700px] mx-auto my-16 p4'>
            <div className="flex flex-col px-20 py-10">
                <h1 className='text-6xl text-center font-bold py-4 underline'>Sign up</h1>
            </div>
            <h1 className='text-2xl font-bold py-2'>Creeate an account account</h1>

            {error !== '' && <p className='py-2 text-red-500'>{error}</p>}

            {/* sign up form */}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Email Address</label>
                    <input className='border p-3' type='email' placeholder='enter email address' onChange={(e) => {
                        setError('')
                        setData({ ...data, email: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>First name</label>
                    <input className='border p-3' type='text' placeholder='enter your name' onChange={(e) => {
                        setError('')
                        setData({ ...data, fname: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Last name</label>
                    <input className='border p-3' type='text' placeholder='enter your last name(s)' onChange={(e) => {
                        setError('')
                        setData({ ...data, lname: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Rank</label>
                    <input className='border p-3' type='numeric' placeholder='enter your rank' onChange={(e) => {
                        setError('')
                        setData({ ...data, rank: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Force Number Field</label>
                    <input className='border p-3' type='text' placeholder='enter your force number field' onChange={(e) => {
                        setError('')
                        setData({ ...data, forceNo: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Password</label>
                    <input className='border p-3' type='password' placeholder='enter password' onChange={(e) => {
                        setError('')
                        setData({ ...data, password: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Confirm Password</label>
                    <input className='border p-3' type='password' placeholder='confirm your password' onChange={(e) => {
                        setError('')
                        setData({ ...data, confirm: e.target.value })
                    }} />
                </div>

                <button className='border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-center text-white shadow-lg rounded-md'>{loading ? 'Creating account...' : 'Sign up'}</button>
                <p className='py-2'>
                    Already have an account? <Link className='underline' to={'/'}>Sign In</Link> to your accout
                </p>
            </form>

            <div className="custom-shape-divider-bottom-1665696366">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}

export default Signup
