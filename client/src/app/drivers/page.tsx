'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getTransfers() {
            try {
                setLoading(true)
                let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setDrivers(await response.json())
            } catch (err) {
                console.log("Error while fetching drivers")
            } finally {
                setLoading(false);
            }
        }
        getTransfers();
    }, [])

    return (
        <div className='page-container'>
            <header>
                <h3>Drivers</h3>
                <span>Search</span>
            </header>
            <section>
                <p>
                    <label>Total Drivers: {drivers.length}</label>

                </p>
                <div className='table-head'>
                    <span>Id</span>
                    <span>Name</span>
                    <span>Phone Number</span>
                    <span>Profile Photo</span>
                </div>
                <div className='table-body'>
                    {drivers?.length > 0 && drivers.map((driver) => (
                        <div className='table-row' key={driver.id}>
                            <span>{driver.id}</span>
                            <span>{driver.name}</span>
                            <span>{driver.phone}</span>
                            <span><Image src={driver.profilePic} loading='lazy' alt="Driver Pic" width={200} height={200}/></span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page
