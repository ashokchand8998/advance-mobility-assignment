'use client';

import Image from 'next/image';
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { openImageInNewTab } from '../utils/common';
import { DataContext } from '../components/ContextWrapper';

const page = () => {
    const [drivers, setDrivers] = useState([])
    const [context, setContext] = useContext(DataContext)
    const [newDriverName, setNewDriverName] = useState('')
    const [newDriverPhone, setNewDriverContact] = useState('');
    const [newDriverDP, setNewDriverDP] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getDrivers() {
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
        getDrivers();
    }, [])

    const addNewDriver = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("formData", newDriverName, newDriverPhone, newDriverDP)
        // validate size of profilePic to 1MB
        if (newDriverDP.size > 1000000) {
            alert("Profile pic size should be less than 1MB");
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(newDriverDP);
        reader.onload = async () => {
            try {
                setLoading(true)
                let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: newDriverName,
                        phone: newDriverPhone,
                        profilePic: reader.result
                    }),
                });
                let data = await response.json();
                let mergedDrivers = [...drivers, data]
                setDrivers(mergedDrivers);
                console.log('mergedDrivers:', [...mergedDrivers]);
                setContext((prevContext) => ({ ...prevContext, drivers: mergedDrivers }))
            } catch (err) {
                console.log("Error while adding new driver")
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className='page-container'>
            <header>
                <h3>Drivers</h3>
                <span>Search</span>
            </header>
            <form onSubmit={addNewDriver}>
                <label>
                    Full Name
                    <input type='text' value={newDriverName} onChange={(event) => setNewDriverName(event.target.value)} name='name' placeholder='Enter full name' required />
                </label>
                <label>
                    Phone Number
                    <input type='tel' pattern="^[1-9][0-9]{9}$" value={newDriverPhone} onChange={(event) => setNewDriverContact(event.target.value)} name='name' placeholder='Enter phone number' required />
                </label>
                <label>
                    Select profile pic
                    <input type='file' accept='image/*' name='name' onChange={(event) => setNewDriverDP(event.target.files[0])} placeholder='Select profile pic' required />
                </label>
                <button type='submit'>Add Driver</button>
            </form>
            <section>
                <p className='count'>
                    <label>Total Drivers: <span>
                        {drivers.length}
                    </span>
                    </label>
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
                            <span><Image src={driver.profilePic || ''} title="Click to view" loading='lazy' alt="Driver Pic" width={200} height={200} onClick={() => openImageInNewTab(driver.profilePic)} /></span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page
