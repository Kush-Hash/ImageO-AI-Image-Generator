import React from 'react'
import { motion } from 'framer-motion'
import { testimonialsData } from '../assets/assets'
import { assets } from '../assets/assets'

const Testimonial = () => {
    return (
        <div className='flex flex-col items-center justify-center my-20 py-12'>

            <motion.h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-white'
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
            >
                Customer testimonials
            </motion.h1>
            <motion.p className='text-gray-300 mb-12'
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
            >
                What Our Users Are Saying
            </motion.p>

            <div className='flex flex-wrap gap-8 text-gray-300 justify-center'>
                {testimonialsData.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className='bg-white p-12 rounded-lg shadow-amber-500 w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className='flex flex-col items-center text-center'>
                            <img src={testimonial.image} alt="" className='rounded-full w-18' />
                            <h2 className='text-xl font-semibold mt-3 text-stone-800'>{testimonial.name}</h2>
                            <p className='text-stone-500 mb-4'>{testimonial.role}</p>
                            <div className='flex mb-4'>
                                {Array(testimonial.stars).fill().map((_, i) => (
                                    <img key={i} src={assets.rating_star} alt="" />
                                ))}
                            </div>
                            <p className='text-center text-sm text-gray-900'>{testimonial.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial
