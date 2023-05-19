import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';


const CheckOut = () => {
    const service = useLoaderData();
    const {user}=useContext(AuthContext)

    const { _id, price, title,img } = service;
    
    const handleOrder=event=>{
        event.preventDefault();

        const form=event.target;
        const name=form.name.value;
        const email=user?.email;
        const date=form.date.value;
        const  order={
            CustomarName:name,email,date,
            service:_id,
            pirce:price,
            img:img,
            serviceName:title
        }

        console.log(order)

        fetch('http://localhost:500/bookservices',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                alert ('Service added successfully')
            }
        })
    }
    return (
        <div className='mt-10 mb-10'>
            <h1 className='text-center text-3xl  mb-10'>Book Services:{title}</h1>
            <form onSubmit={handleOrder} >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' defaultValue={user?.displayName} placeholder="Name" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name='date' className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" defaultValue={user?.email} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due Price</span>
                    </label>
                    <input type="text" name='price' defaultValue={price} placeholder="Due Price" className="input input-bordered" />
                </div>
                
                </div>
                <div className="form-control mt-6">
                    <input type="submit" className="btn btn-primary btn-block" value="Order Checkout" />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;