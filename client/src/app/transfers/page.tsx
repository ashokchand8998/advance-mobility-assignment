'use client';

import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { DataContext } from '../components/ContextWrapper';

const page = () => {
    const [context, setContext] = useContext(DataContext)
    const [transfers, setTransfers] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [selectedOwner, setSelectedOwner] = useState(null)
    const [loading, setLoading] = useState(false);

    const getTransfers = async () => {
        try {
            setLoading(true)
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transfers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setTransfers(await response.json())
        } catch (err) {
            console.log("Error while fetching transfers")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTransfers();
    }, [])

    const initiateTransfer = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true)
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${selectedVehicle.id}/transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // handle driver to owner here
                body: JSON.stringify({
                    newOwnerType: selectedOwner.type || 'driver',
                    newOwnerId: selectedOwner.id,
                    newOwnerName: selectedOwner.name
                }),
            })

            let data = await response.json()
            console.log('Success:', data);

            let tempVehicles = context.vehicles;
            for (let i = 0; i < tempVehicles.length; i++) {
                if (tempVehicles[i].id === selectedVehicle.id) {
                    tempVehicles[i] = data;
                    break;
                }
            }
            setSelectedVehicle(null)
            setSelectedOwner(null)

            getTransfers();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    const findAndUpdateSelectedVehicle = (event) => {
        const selectedValue = event.target.value;
        const selectedObject = context?.vehicles.find(vehicle => vehicle.id == selectedValue);
        setSelectedVehicle(selectedObject ? selectedObject : null);
        setSelectedOwner(null)
    }

    const findAndUpdateSelectedOwner = (event) => {
        const selectedValue = event.target.value;
        const selectedObject = context?.owners.find(owner => owner.id == selectedValue);
        console.log("type", selectedObject)
        setSelectedOwner(selectedObject ? selectedObject : null);
    }


    return (
        <div className='page-container'>
            <form onSubmit={initiateTransfer}>
                <label>
                    Select New Vehicle:
                    <select name='vehicle' required
                        value={selectedVehicle?.id || ''}
                        onChange={(e) => findAndUpdateSelectedVehicle(e)}
                    >
                        <option value={''} disabled>Select Vehicle</option>
                        {context.vehicles && context.vehicles.map((vehicle) => (
                            <option
                                key={vehicle.id}
                                value={vehicle.id}
                            >
                                {vehicle.vehicleNumber}
                            </option>))}
                    </select>                </label>
                <label>
                    Select Owner:
                    <select name='owner' required
                        disabled={!selectedVehicle}
                        value={selectedOwner?.id || ''}
                        onChange={(e) => findAndUpdateSelectedOwner(e)}>
                        <option value={''} disabled>Select Owner</option>
                        {context.owners && context.owners.map((owner) => (
                            <option
                                key={owner.id}
                                value={owner.id}
                                disabled={owner.id == selectedVehicle?.currentOwnerId}
                            >
                                {owner.name}
                            </option>))}
                    </select>
                </label>

                <input type="submit" value="Submit" />
            </form>

            <header>
                <h3>Transfers</h3>
                <span>Search</span>
            </header>
            <section>
                <p>
                    <label>Total Transfers: {transfers.length}</label>

                </p>
                <div className='table-head'>
                    <span>Vehicle Number</span>
                    <span>To</span>
                    <span>From</span>
                    <span>Date</span>
                </div>
                <div className='table-body'>
                    {transfers?.length > 0 && transfers.map((transfer) => (
                        <div className='table-row' key={transfer.id}>
                            <span>{transfer.vehicle.vehicleNumber}</span>
                            <span>{transfer.newOwnerName}</span>
                            <span>{transfer.previousOwnerName}</span>
                            <span>{transfer.date}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page
