'use client'

import Link from 'next/link'
import React, { createContext, useEffect, useState } from 'react'

const DataContext = createContext(null)

const ContextWrapper = ({ children }) => {
    const [context, setContext] = useState({ vehicles: [], owners: [], transfers: [] })

    const getTransfers = async () => {
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transfers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updatedTransfers = await response.json();
            setContext((prevContext) => ({ ...prevContext, transfers: updatedTransfers }))
        } catch (err) {
            console.log("Error while fetching transfers")
        }
    }

    const getOwners = async () => {
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updatedOwners = await response.json();
            setContext((prevContext) => ({ ...prevContext, owners: updatedOwners }))
        } catch (err) {
            console.log("Error while fetching owners")
        }
    }

    const getVehicles = async () => {
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updatedVehicles = await response.json();
            setContext((prevContext) => ({ ...prevContext, vehicles: updatedVehicles }))
        } catch (err) {
            console.log("Error while fetching vehicles")
        }
    }

    useEffect(() => {
        getTransfers();
        getOwners();
        getVehicles();
    }, []);

    return (
        <DataContext.Provider value={[context, setContext]}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, ContextWrapper };
