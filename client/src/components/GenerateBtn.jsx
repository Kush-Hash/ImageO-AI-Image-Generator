import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const GenerateBtn = () => {

    const navigate = useNavigate();
    const { user, setShowLogin } = useContext(AppContext);
    const onClickHandler = () => {
        user ? navigate('/result') : setShowLogin(true)
    }

    return (
        <motion.div
            className='flex flex-col items-center justify-center bg-white py-10 gap-5 overflow-hidden'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: false }}
        >
            {/* Magical Title with Glow */}
            <motion.h1
                className='inline-flex text-2xl md:text-3xl lg:text-4xl font-semibold text-black'
                initial={{
                    opacity: 0,
                    textShadow: '0 0 0px #fff',
                }}
                whileInView={{
                    opacity: 1,
                    textShadow: '0 0 8px #facc15, 0 0 12px #f59e0b',
                }}
                transition={{
                    duration: 1.8,
                    ease: 'easeInOut',
                }}
                viewport={{ once: true, amount: 0.5 }}
            >
                See the magic &nbsp;
                <span>
                    <img src={assets.star_group} alt="" className='h-8' />
                </span>
                &nbsp; Try Now
            </motion.h1>
            {/* Animated Button */}
            <motion.button
                className='flex items-center justify-center gap-2 text-white bg-black px-12 py-3 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer'
                initial={{ scale: 0.95 }}
                animate={{
                    scale: [1, 1.03, 0.98, 1],
                    boxShadow: [
                        '0 0 0px #000',
                        '0 0 10px #facc15',
                        '0 0 20px #facc15',
                        '0 0 10px #facc15',
                        '0 0 0px #000',
                    ],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                }}
                onClick={onClickHandler}
            >
                <img src={assets.star_group} alt="" className='w-4' />
                Generate Images
                <img src={assets.star_group} alt="" className='w-4' />
            </motion.button>
        </motion.div>
    );
};

export default GenerateBtn;
