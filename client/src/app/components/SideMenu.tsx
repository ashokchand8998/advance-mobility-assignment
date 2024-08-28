import Link from 'next/link'
import React from 'react'

const SideMenu = () => {
    return (
        <div className='side-menu-container'>
            <Link href={'/drivers'} >Driver</Link>

            <Link href={'/vehicles'} >Vehicles</Link>

            <Link href={'/transfers'} >Transfers</Link>
        </div>
    )
}

export default SideMenu
