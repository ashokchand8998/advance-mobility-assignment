'use client'

import Link from 'next/link'
import React from 'react'
import '../common-styles.scss'
import { usePathname } from 'next/navigation'

const SideMenu = () => {
    const currPathName = usePathname();
    return (
        <div className={currPathName === '/' ? 'home-page side-menu-container' : 'side-menu-container'}>
            <header>
                <h3>Navigation</h3>
            </header>
            <Link href={'/vehicles'} className={currPathName === '/vehicles' ? 'active-link' : ''}>🚕 Vehicles</Link>
            <Link href={'/drivers'} className={currPathName === '/drivers' ? 'active-link' : ''}>🧑 Drivers</Link>
            <Link href={'/transfers'} className={currPathName === '/transfers' ? 'active-link' : ''}>⏭️ Transfers</Link>
        </div>
    )
}

export default SideMenu
