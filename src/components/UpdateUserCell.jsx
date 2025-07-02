import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';


const UpdateUserCell = () => {
    const [cellId, setCellId] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { database } = UserAuth()

    const goBack = () => {
        navigate('/users')
    }

    const updateUser = async (e) => {
        e.preventDefault()
        setError('')

        if (cellId !== '') {
            try {
                setLoading(true)
                const id = localStorage.getItem('userid')

                const unsub = onSnapshot(query(collection(database, `cells`), where('cellId', '==', cellId)), snap => {
                    if (snap.docs.length === 0) {
                        setError('This station does not exist, please verify station id')
                        setLoading(false)
                        unsub()
                    } else {
                        snap.docs.map(async docdata => {
                            await updateDoc(doc(database, `users/${id}`), { cellId: cellId, cellName: docdata.data().name, approved: true })
                            navigate('/users')
                        })
                        unsub()
                    }
                })

            } catch (error) {
                setLoading(false)
            }
        } else {
            setError('Make sure you provide the cell id')
        }

    }

    return (
        <div className='max-w-[700px] mx-auto my-16 p4'>
            <div className="flex flex-col px-20 py-10">
                <h1 className='text-6xl text-center font-bold py-4 underline'>Add Info</h1>
            </div>

            {error !== '' && <p className='py-2 text-red-500'>{error}</p>}

            {/* sign up form */}
            <form onSubmit={updateUser}>
                <div className='flex flex-col py-2'>
                    <label className='py2 font-medium'>Add cell Id to this user to complete the process</label>
                    <input className='border p-3' type='text' placeholder='enter stattion' onChange={(e) => {
                        setError('')
                        setCellId(e.target.value)
                    }} />
                </div>


                <div className='flex flex-row justify-center items-center'>
                    <button type='button' onClick={goBack} className='border-red-400 bg-red-600 hover:bg-red-500 w-full p-4 my-2 text-center text-white shadow-lg rounded-md mr-5'>Cancel</button>
                    <button type='submit' className='border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-center text-white shadow-lg rounded-md'>{loading ? 'Updating...' : 'Submit'}</button>
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

export default UpdateUserCell
