'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../components/ContextWrapper';

const page = () => {
    const [context, setContext] = useContext(DataContext)
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTransfers = async () => {
        try {
            setLoading(true)
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updatedVehicles = await response.json();
            setVehicles(updatedVehicles)
            setContext((prevContext) => ({ ...prevContext, vehicles: updatedVehicles }))
        } catch (err) {
            console.log("Error while fetching vehicles")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTransfers();
    }, []);

    return (
        <div className='page-container'>
            <header>
                <h3>Vehicles</h3>
                <span>Search</span>
            </header>
            <section>
                <p>
                    <label>Total Vehicles: {vehicles.length}</label>

                </p>
                <div className='table-head'>
                    <span>Vehicle Number</span>
                    <span>Vehicle Type</span>
                    <span>Owner</span>
                    <span>PU Certificate</span>
                    <span>Insurance Certificate</span>
                </div>
                <div className='table-body'>
                    {vehicles?.length > 0 && vehicles.map((vehicle) => (
                        <div className='table-row' key={vehicle.id}>
                            <span>{vehicle.vehicleNumber}</span>
                            <span>{vehicle.vehicleType}</span>
                            <span>{vehicle.currentOwnerName}</span>
                            <span><Image src={`data:image/jpeg;base64,${vehicle.pucCert}`} loading='lazy' alt="PUC Image" width={200} height={200} /></span>
                            <span><Image src={`data:image/jpeg;base64,${vehicle.insuranceCert}`} loading='lazy' alt="Insurance Image" width={200} height={200} /></span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page
