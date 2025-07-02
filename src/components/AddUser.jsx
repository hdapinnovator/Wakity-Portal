import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addDoc, collection, onSnapshot, doc, query, updateDoc, where } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';


const AddUser = () => {
    const [data, setData] = useState({
        fname: '',
        id: '',
        lname: '',
        dob: '',
        idNo: '',
        crimetype: '',
    })
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { userdata, database } = UserAuth()

    const updateData = async () => {
        setError('')

        try {
            setLoading(true)
            await updateDoc(doc(database, `criminals/${data.id}`), { data })
            navigate('/account')
            localStorage.removeItem('user')
        } catch (error) {
            setLoading(false)
        }

    }


    const handleAddUser = async (e) => {
        e.preventDefault()
        setError('')

        if (data.dob === '' || data.idNo === '' || data.lname === '' || data.fname === '' || data.crimetype === '') {
            setError('Please make sure all field are populated')
        } else {
            setLoading(true)
            try {
                const postData = {
                    fname: data.fname,
                    lname: data.lname,
                    dob: data.dob,
                    idNo: data.idNo,
                    crimetype: data.crimetype,
                    date: new Date().toLocaleString(),
                    cellId: userdata ? userdata.cellId : '',
                    cellName: userdata ? userdata.cellName : '',
                }

                const snap = onSnapshot(query(collection(database, 'criminals'), where('idNo', '==', postData.idNo)), res => {
                    if (res.empty) {
                        addDoc(collection(database, `criminals`), postData)
                        navigate('/account')
                    } else {
                        return setError(`This user already exists with the same id ${data.idNo} in cell Id: ${res.docs[0].data().cellId}`)
                    }
                    snap()
                })
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        }
    }

    const goBack = () => {
        localStorage.removeItem('user')
        navigate('/account')
    }


    useEffect(() => {
        const val = localStorage.getItem('user')
        if (val !== null) {
            setView(true)
            setData(JSON.parse(val))
        }
        setError('')
    }, [])


    return (
        <div className='max-w-[700px] mx-auto my-16 p4'>
            <div className="flex flex-col px-20 py-10">
                <h1 className='text-6xl text-center font-bold py-4 underline'>Add new criminal</h1>
            </div>

            {error !== '' && <p className='py-2 text-red-500'>{error}</p>}

            {/* sign up form */}
            <form onSubmit={handleAddUser}>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>First name</label>
                    <input value={data.fname} className='border p-3' type='text' placeholder='enter your name' onChange={(e) => {
                        setError('')
                        setData({ ...data, fname: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Last name</label>
                    <input value={data.lname} className='border p-3' type='text' placeholder='enter your last name(s)' onChange={(e) => {
                        setError('')
                        setData({ ...data, lname: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>ID</label>
                    <input value={data.idNo} className='border p-3' type='text' placeholder='enter id number' onChange={(e) => {
                        setError('')
                        setData({ ...data, idNo: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Date or Birth</label>
                    <input value={data.dob} className='border p-3' type='date' placeholder='enter date of birth' onChange={(e) => {
                        setError('')
                        setData({ ...data, dob: e.target.value })
                    }} />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Crime type</label>
                    <input value={data.crimetype} className='border p-3' type='text' placeholder='enter crime type' onChange={(e) => {
                        setError('')
                        setData({ ...data, crimetype: e.target.value })
                    }} />
                </div>

                <div className='flex flex-row justify-center items-center'>
                    <button type='button' onClick={goBack} className='border-red-400 bg-red-600 hover:bg-red-500 w-full p-4 my-2 text-center text-white shadow-lg rounded-md mr-5'>Cancel</button>
                    {!view && <button type='submit' className='border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-center text-white shadow-lg rounded-md'>{loading ? 'Adding user...' : 'Submit'}</button>}
                    {view && <button type='button' onClick={updateData} className='border-green-500 bg-green-600 hover:bg-green-500 w-full p-4 my-2 text-center text-white shadow-lg rounded-md'>{loading ? 'Updating info...' : 'Update Info'}</button>}
                </div>
            </form>

            <div className="custom-shape-divider-bottom-1665696366">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}

export default AddUser
