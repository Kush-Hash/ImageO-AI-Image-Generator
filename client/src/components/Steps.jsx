import { motion } from 'framer-motion';
import { stepsData } from '../assets/assets';

const Steps = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center py-10 mt-10 mb-20'>
            {/* Title */}
            <motion.h1
                className='text-4xl sm:text-5xl font-semibold mb-2 text-white'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: false, amount: 0.3 }}
            >
                How it works
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className='text-lg text-white mb-8'
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                Transform words into stunning images
            </motion.p>

            {/* Steps */}
            <div className='space-y-4 max-w-3xl text-sm'>
                {stepsData.map((item, index) => (
                    <motion.div
                        key={index}
                        className='flex items-start gap-4 p-5 px-8 bg-white shadow-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeOut',
                            delay: 0.3 + index * 0.15,
                        }}
                        viewport={{ false: true, amount: 0.3 }}
                    >
                        <img width={50} src={item.icon} alt={item.title} />
                        <div>
                            <h2 className='text-xl font-medium'>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Steps;
