'use client';

import Image from 'next/image';
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { DataContext } from '../components/ContextWrapper';
import { fileToBase64, openImageInNewTab } from '../utils/common';

const page = () => {
    const [context, setContext] = useContext(DataContext)
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newVehiclePUC, setNewVehiclePUC] = useState('')
    const [newVehicleInsurance, setNewVehicleInsurance] = useState('')
    const [newVehicleNumber, setNewVehicleNumber] = useState('')
    const [newVehicleType, setNewVehicleType] = useState('');
    const [ownerType, setOwnerType] = useState('drivers');
    const [newVehicleOwner, setNewVehicleOwner] = useState(null)

    const getVehicles = async () => {
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
        getVehicles();
    }, []);

    const addNewVehicle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("formData", newVehicleNumber, newVehicleOwner, newVehiclePUC, newVehicleInsurance)
        // validate size of profilePic to 1MB
        if (newVehiclePUC.size > 1000000) {
            alert("PUC image size should be less than 1MB");
            return;
        }

        if (newVehicleInsurance.size > 1000000) {
            alert("Insurance image should be less than 1MB");
            return;
        }

        let pucBase64 = newVehiclePUC ? await fileToBase64(newVehiclePUC) : null;
        let insuranceBase64 = newVehicleInsurance ? await fileToBase64(newVehicleInsurance) : null;
        try {
            setLoading(true)
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vehicleNumber: newVehicleNumber,
                    vehicleType: newVehicleType,
                    pucCert: pucBase64,
                    insuranceCert: insuranceBase64,
                    currentOwnerId: newVehicleOwner.id,
                    currentOwnerName: newVehicleOwner.name,
                    currentOwnerType: newVehicleOwner.type,
                }),
            });
            let data = await response.json();
            console.log('Success:', data);
            setVehicles([...vehicles, data]);
            setContext((prevContext) => ({ ...prevContext, vehicles: [...vehicles, data] }))
        } catch (err) {
            console.log("Error while adding new vehicle")
        } finally {
            setLoading(false);
        }
    }

    const findAndUpdateSelectedOwner = (event) => {
        const selectedValue = event.target.value;
        const selectedObject = context[ownerType].find(owner => owner.id == selectedValue);
        console.log("type", selectedObject)
        setNewVehicleOwner(selectedObject ? selectedObject : null);
    }

    return (
        <div className='page-container'>
            <header>
                <h3>Vehicles</h3>
                <span>Search</span>
            </header>

            <form onSubmit={addNewVehicle}>
                <label>
                    Vehicle Number
                    <input type='text' value={newVehicleNumber} onChange={(event) => setNewVehicleNumber(event.target.value)} name='name' placeholder='Enter vehicle number' required />
                </label>
                <label>
                    Vehicle Type
                    <select name='type' required
                        value={newVehicleType}
                        onChange={(e) => setNewVehicleType(e.target.value)}>
                        <option value={''} disabled>Select Vehicle Type</option>
                        <option value='Car'>
                            Car
                        </option>
                        <option value='Truct'>
                            Truck
                        </option>
                    </select>
                </label>
                <label>
                    Owner Type
                    <select name='type' required
                        value={ownerType}
                        onChange={(e) => setOwnerType(e.target.value)}>
                        <option value={''} disabled>Select Owner Type</option>
                        <option value='drivers'>
                            Driver
                        </option>
                        <option value='orgs'>
                            Organization
                        </option>
                    </select>
                </label>
                <label>
                    Vehicle Owner
                    <select name='owner' required
                        // disabled={!newVehicleType}
                        value={newVehicleOwner?.id || ''}
                        onChange={(e) => findAndUpdateSelectedOwner(e)}>
                        <option value={''} disabled>Select Owner</option>
                        {context[ownerType] && context[ownerType].map((owner) => (
                            <option
                                key={owner.id}
                                value={owner.id}
                            >
                                {owner.name}
                            </option>))}
                    </select>
                </label>
                <label>
                    Select PUC Certificate
                    <input type='file' accept='image/*' name='name' onChange={(event) => setNewVehiclePUC(event.target.files[0])} placeholder='Select PUC image' required />
                </label>
                <label>
                    Select Insurance Certificate
                    <input type='file' accept='image/*' name='name' onChange={(event) => setNewVehicleInsurance(event.target.files[0])} placeholder='Select Insurance image' required />
                </label>
                <button type='submit'>Add Vehicle</button>
            </form>

            <section>
                <p className='count'>
                    <label>Total Vehicles: <span>{vehicles.length}</span></label>
                </p>
                <div className='table-head'>
                    <span className='lg'>Vehicle Number</span>
                    <span>Vehicle Type</span>
                    <span>Owner</span>
                    <span className='lg'>PU Certificate</span>
                    <span className='lg'>Insurance Certificate</span>
                </div>
                <div className='table-body'>
                    {vehicles?.length > 0 && vehicles.map((vehicle) => (
                        <div className='table-row' key={vehicle.id}>
                            <span className='lg'>{vehicle.vehicleNumber}</span>
                            <span>{vehicle.vehicleType}</span>
                            <span>{vehicle.currentOwnerName}</span>
                            <span className='lg'><Image src={vehicle.pucCert || ''} title="Click to view" loading='lazy' alt="Vehicle PUC Pic" width={200} height={200} onClick={() => openImageInNewTab(vehicle.pucCert)} /></span>
                            <span className='lg'><Image src={vehicle.insuranceCert || ''} title="Click to view" loading='lazy' alt="Vehicle Insurance Pic" width={200} height={200} onClick={() => openImageInNewTab(vehicle.insuranceCert)} /></span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page
