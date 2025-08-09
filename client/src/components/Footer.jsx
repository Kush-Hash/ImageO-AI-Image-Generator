import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className='flex items-center justify-center gap-4 py-3 bg-white px-12'>

            <img src={assets.logo} alt="" className='w-{150}' />
            <p className='flex-1 text-gray-300 text-sm max-sm:hidden'>© 2024 Imagify. All rights reserved.</p>
            <div className='flex items-center gap-4'>
                <img src={assets.facebook_icon} alt="" className='w-{35}' />
                <img src={assets.twitter_icon} alt="" className='w-{35}' />
                <img src={assets.instagram_icon} alt="" className='w-{35}' />
            </div>
        </div>
    )
}

export default Footer
