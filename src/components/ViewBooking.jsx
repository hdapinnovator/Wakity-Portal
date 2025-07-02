import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SendEmail from './SendEmail'


const ViewBooking = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()


    // const sendEmail = (e) => {
    //     e.preventDefault(); // prevents the page from reloading when you hit “Send”

    //     emailjs.sendForm('service_1gucnkx', 'YOUR_TEMPLATE_ID', form.current, '5132CB9ev9m_ErpH-')
    //         .then((result) => {
    //             // show the user a success message
    //         }, (error) => {
    //             // show the user an error
    //         });
    // };


    // create method handleContact
    const handleContact = (id) => {
        navigate(`/contact/${id}`)
    }


    useEffect(() => {
        const data = localStorage.getItem('data')
        if (data !== null) setData([JSON.parse(data)])
    }, [])



    return (
        <div className='max-w-[100%] my-auto my-16 p-4'>
            <div className="flex flex-col">
                <h1 className='text-3xl font-bold text-center underline my-20'></h1>

                <div className="flex flex-col px-20">
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
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                                            >
                                                Price
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
                                            >
                                                Contact
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {
                                            data.map(booking => {
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
                                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                                                className="text-blue-500 hover:text-green-700" type='button'
                                                            >
                                                                Contact
                                                            </button>
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


            </div>

            <SendEmail show={true} />
        </div>
    )
}

export default ViewBooking
