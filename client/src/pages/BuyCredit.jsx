import React, { useContext } from 'react'
import TypeIt from 'typeit-react'
import { motion } from 'framer-motion'
import { plans, assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const BuyCredit = () => {
    const { user } = useContext(AppContext);

    return (
        <div className='min-h-[80vh] text-center pt-10 mb-10'>

            {/* Animated TypeIt Button */}
            <button className='text-stone-950 bg-white text-center px-6 py-1 rounded-full border border-neutral-300 text-lg w-40 mt-6 font-medium'>
                <TypeIt
                    options={{
                        speed: 100,
                        waitUntilVisible: true,
                        loop: true,
                    }}
                    getBeforeInit={(instance) => {
                        instance
                            .type('Our Plans')
                            .pause(600)
                            .delete()
                            .pause(500)
                            .go();
                        return instance;
                    }}
                />
            </button>

            {/* Animated Heading */}
            <motion.h1
                className='text-center text-4xl font-medium mb-6 mt-6 sm:mb-10 text-white'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true }}
            >
                Choose the plan
            </motion.h1>

            {/* Animated Plan Cards */}
            <div className='flex flex-wrap justify-center gap-6 text-left'>
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        className='bg-white shadow-lg border rounded-lg py-12 px-8 text-stone-950 hover:scale-105 transition-all duration-500 mb-4 cursor-pointer w-60'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        <img width={40} src={assets.logo_icon} alt="lock icon" className='mb-2' />
                        <p className='mb-1 font-semibold'>{plan.id}</p>
                        <p className='text-sm'>{plan.desc}</p>
                        <p className='mt-6'><span className='text-3xl font-medium'> {plan.price}</span> / {plan.credits} credits</p>
                        <button className='bg-stone-950 text-white w-full mt-8 text-sm rounded-md py-2.5'>
                            {user ? 'Purchase' : 'Get Started'}
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default BuyCredit
