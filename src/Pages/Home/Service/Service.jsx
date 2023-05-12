import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Service = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('http://localhost:500/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div className='mt-10 mb-10'>
            <div className='text-center space-y-3'>
                <h1 className='text-3xl text-orange-500'>Service</h1>
                <h2 className='text-4xl font-bold'>Our Service Area</h2>
                <p>The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service=><ServiceCard
                       key={service._id}
                       service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Service;