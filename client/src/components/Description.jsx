import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Description = () => {
    return (
        <div className='flex flex-col items-center justify-center my-20 mb-20 px-4 md:px-28 mt-12'>

            {/* Header */}
            <motion.h1
                className='text-3xl sm:text-4xl font-semibold text-cyan-100 mb-2 text-center'
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ amount: 0.3 }}
            >
                Create AI Images
            </motion.h1>

            {/* Subtext */}
            <motion.p
                className='text-gray-200 mb-8 text-center'
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                viewport={{ amount: 0.3 }}
            >
                Turn your imagination into visuals
            </motion.p>

            {/* Image + Description Block */}
            <div className='flex flex-col md:flex-row items-center md:items-start justify-center gap-8 mb-20 text-gray-200'>

                {/* Image from left */}
                <motion.img
                    src={assets.sample_img_1}
                    alt="Sample AI Output"
                    className='w-full max-w-md md:max-w-sm lg:max-w-80 rounded-lg'
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    viewport={{ amount: 0.3 }}
                />

                {/* Text from right */}
                <motion.div
                    className='w-full md:w-auto max-w-2xl'
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ amount: 0.3 }}
                >
                    <h2 className='text-2xl sm:text-3xl font-medium mb-4'>
                        Introducing the AI-Powered Text to Image Generator
                    </h2>
                    <p className='text-gray-300 mb-4'>
                        Our AI-powered text to image generator transforms your words into stunning visuals. Whether you're a designer, marketer, or just curious, this tool is perfect for creating unique images from simple text prompts.
                    </p>
                    <p className='text-gray-300'>
                        Simply type in a text prompt, and our cutting-edge AI will generate stunning, high-quality images within seconds. Whether you need product visuals, character designs, portraits, or imaginative concepts that don’t even exist yet — our AI brings your ideas to life effortlessly. Powered by advanced AI technology, it transforms your words into visually captivating creations. No design skills required — just your imagination.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Description;
