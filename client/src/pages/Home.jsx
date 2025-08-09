import React from 'react'
import Header from '../components/Header'
import Carousal from '../components/Carousal'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GenerateBtn from '../components/GenerateBtn'
//bg-gradient-to-b from-white/10 via-transparent to-transparent
const Home = () => {
    return (
        <>
            {/* Header Section */}
            <Header />

            {/* Carousel Section */}
            <div className="w-full">
                <Carousal />
            </div>

            <div className='px-4 sm:px-10 md:px-14 lg:px-16 xl:px-28 2xl:px-32 bg-gray-950 overflow-hidden'>
                <Steps />
                <Description />
            </div >

            <div className='w-full overflow-hidden'>
                <GenerateBtn />
            </div>

            <div className='px-4 sm:px-10 md:px-14 lg:px-16 xl:px-28 2xl:px-32 bg-gray-950 overflow-hidden'>
                <Testimonial />
            </div >
        </>
    )
}

export default Home