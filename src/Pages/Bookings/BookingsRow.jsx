import React from 'react';

const BookingsRow = ({ booking, handleDelete, handleConfirm }) => {
    console.log(booking)
    const { img, pirce, email, date, serviceName, _id, status } = booking;

    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-12">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{serviceName}</div>
                        <div className="text-sm opacity-50">{email}</div>
                    </div>
                </div>
            </td>
            <td>
                <p>$ {pirce}</p>
            </td>
            <td>
                <p>{date}</p>
            </td>
            <th>
                {status === 'Confirm' ? <span className='text-bold text-primary'>Apporved</span> :
                    <button onClick={() => handleConfirm(_id)} className="btn btn-ghost btn-xs">Confirm</button>}
            </th>
        </tr>
    );
};

export default BookingsRow;