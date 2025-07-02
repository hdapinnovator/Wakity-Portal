import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { database } from '../firebase'

const Users = () => {
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [approved, setApproved] = useState(false)
    const [users, setUsers] = useState([])
    const [filtered, setFiltered] = useState([])
    const navigate = useNavigate()

    const { deleteUser } = UserAuth()




    // deletet user
    const handleDelete = async (id) => {
        try {
            await deleteUser(id)
            setDeleted(true)
        } catch (error) {
            setError(error.message)
        }
    }


    // filter user method
    const filterUsers = (text) => {
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = filtered.filter((item) => {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })

            setFiltered(newData)
            setSearch(text)
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFiltered(users)
            setSearch(text)
        }
    }


    // back button
    const addUser = () => {
        navigate('/addnormal')
    }

    // approve usesr
    const approveUser = async (id) => {
        localStorage.setItem('userid', id)
        navigate('/updateuser')
    }

    useEffect(() => {
        const unsub = onSnapshot(query(collection(database, 'users'), where('shop', '==', true)), snap => {
            const resdata = snap.docs.map(doc => {
                const id = doc.id
                const data = doc.data()
                return { id, ...data }
            })

            setUsers(resdata)
            setFiltered(resdata)
        })

        return () => { unsub() }
    }, [deleted])


    return (
        <div className='max-w-[100%] my-auto my-16 p-4'>
            <div className="flex flex-col px-20">
                <h1 className='text-3xl font-bold text-center underline my-20'>All users listed bellow</h1>
                <div className="flex flex-row justify-end">
                    <button className='border px-6 py6 py-2 my-4 bg-green-600 rounded-md text-white'>{users.length} users in total</button>
                    <button onClick={addUser} className='border px-6 py6 py-2 my-4 bg-blue-600 rounded-md text-white'>Add user</button>
                </div>
                <input value={search} onChange={(e) => filterUsers(e.target.value)} className='border p-3' placeholder='Search for user using name' type='text' />
                <div className="overflow-x-auto items-center">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Date created
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            User type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Delete
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Contact
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        filtered.map(user => {
                                            return (
                                                <tr key={user.id}>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                        {user.name || user?.fname}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {user.createdAt}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                        {user.shop ? 'Shop/Vendor' : 'Client'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <a onClick={() => handleDelete(user.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                            href="#"
                                                        >
                                                            Delete
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <a onClick={() => handleDelete(user.id)}
                                                            className="text-blue-500 hover:text-red-700"
                                                            href="#"
                                                        >
                                                            Contact
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="flex flex-row justify-end px-20 pt-10">
                <button onClick={viewUsers} className='border px-6 py6 py-2 my-4 bg-blue-600 rounded-md text-white'>View Users</button>
                <button onClick={handleLogout} className='border px-6 py6 py-2 my-4 bg-red-500 rounded-md text-white mx-5 '>Logout</button>
            </div> */}

            {/* <div className="custom-shape-divider-bottom-1665698234">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div> */}
        </div>
    )
}

export default Users