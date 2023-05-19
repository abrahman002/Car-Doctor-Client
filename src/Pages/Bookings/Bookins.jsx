import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import BookingsRow from './BookingsRow';
import { useNavigate } from 'react-router-dom';

const Bookins = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate=useNavigate()

    const url = `http://localhost:500/bookings?email=${user?.email}`;

    useEffect(() => {
        fetch(url,{
            method:"GET",
            headers:{
                authorization:`bearer ${localStorage.getItem('car-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else{
                    navigate('/')
                }
            })

    }, []);

    const handleDelete = id => {
        const procced = confirm('Are you sure Delete This Item');
        if (procced) {
            fetch(`http://localhost:500/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Successfully Item Delete  ')
                        const rimaining = bookings.filter(Booking => Booking._id !== id);
                        setBookings(rimaining)
                    }
                })
        }
    };

    const handleConfirm=id=>{
        fetch(`http://localhost:500/bookings/${id}`,{
            method:"PATCH",
            headers:{
                'content-type' : 'application/json'
            },
            body:JSON.stringify({status:'Confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                const rimaining=bookings.filter(booking => booking._id !== id);
                const updated=bookings.find(booking=> booking._id === id);
                updated.status='Confirm';
                const newBooking=[updated,...rimaining]
                setBookings(newBooking);
            }
        })
    }
    return (
        <div>
            <h1 className='text-4xl text-center'>My Bookings:{bookings.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full mt-9">
                    <tbody>
                        {
                            bookings.map(booking => <BookingsRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleConfirm={handleConfirm}
                            ></BookingsRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookins;