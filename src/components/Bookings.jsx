import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


const Bookings = () => {
    const [search, setSearch] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [error, setError] = useState('')
    const [bookings, setBookings] = useState([])
    const [filtered, setFiltered] = useState(bookings)
    const { user, logout, config, getBookings, deleteCriminal } = UserAuth()
    const navigate = useNavigate()



    // filter user method
    const filterUsers = (text) => {
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = bookings.filter((item) => {
                const itemData = `${item.shopname}${item?.reference}`
                    ? `${item.shopname}${item?.reference}`.toUpperCase()
                    : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })

            setFiltered(newData)
            setSearch(text)
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFiltered(bookings)
            setSearch(text)
        }
    }



    const viewBooking = (val) => {
        localStorage.setItem('data', JSON.stringify(val))
        navigate('/view-booking')
    }

    // deletet user
    const handleContact = async (id) => {
        try {
            await deleteCriminal(id)
            setDeleted(true)
        } catch (error) {
            setError(error.message)
        }
    }


    useEffect(() => {
        getBookings()
            .then(res => {
                const resdata = res.docs.map(doc => {
                    const id = doc.id
                    const data = doc.data()
                    return { id, ...data }
                })

                setBookings(resdata)
                setFiltered(resdata)
                setDeleted(false)
            })
    }, [deleted])

    return (
        <div className='max-w-[100%] my-auto my-16 p-4'>
            <div className="flex flex-col">
                <h1 className='text-3xl font-bold text-center underline my-20'>All Bookings bellow</h1>
                <div className="flex flex-row justify-end mx-20">
                    <button className='border px-6 py6 py-2 my-4 bg-green-600 rounded-md text-white'>{bookings.length} bookings in total</button>
                </div>
                <div className="flex flex-col px-20">
                    <input value={search} onChange={(e) => filterUsers(e.target.value)} className='border p-3' placeholder='Search by shop name or ference number' type='text' />
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
                                                Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Shop/Vendor name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Paid
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Price
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                            >
                                                Reference
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                            >
                                                View
                                            </th>
                                            {/* <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                                            >
                                                Phone number
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {
                                            filtered.map(booking => {
                                                return (
                                                    <tr key={booking.id}>
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                            {booking.date.date}, {booking.date.time}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            {booking.shopname}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            {booking.payed ? 'Paid' : 'Not paid'}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            {booking.price}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            {booking.reference}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                            <a onClick={() => viewBooking(booking)}
                                                                className="text-green-500 hover:text-red-700"
                                                                href="#"
                                                            >
                                                                View
                                                            </a>
                                                        </td>
                                                        {/* <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                            {booking.phoneNumber}
                                                        </td> */}
                                                        {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                            <a onClick={() => handleContact(booking)}
                                                                className="text-blue-500 hover:text-red-700"
                                                                href="#"
                                                            >
                                                                Contact
                                                            </a>
                                                        </td> */}
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
        </div>
    )
}

export default Bookings
