import { lazy, Suspense, useContext } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { assets } from '../assets/assets';
import './Header.css';
const Spline = lazy(() => import('@splinetool/react-spline'));
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Header = () => {

    const navigate = useNavigate();
    const { user, setShowLogin } = useContext(AppContext);
    const onClickHandler = () => {
        user ? navigate('/result') : setShowLogin(true)
    }

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    const showSpline = inView;

    return (
        <div
            className="relative w-full custom-height overflow-hidden 
             bg-gray-950 
             bg-[radial-gradient(600px_at_0%_100%,rgba(255,255,255,0.1),transparent)] 
             px-4 sm:px-6 md:px-12 py-8 sm:py-12"
            ref={ref}
        >
            <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-start sm:justify-between gap-4 sm:gap-0 mt-10 sm:mt-0">

                {/* Left – Spline 3D Model */}
                <motion.div
                    className="w-full md:w-1/2 flex justify-center items-center"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {showSpline && (
                        <Suspense fallback={<div className="text-white">Loading 3D...</div>}>
                            <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] ">
                                <Spline scene="https://prod.spline.design/DvSR8FUDuTERZdTk/scene.splinecode" />
                            </div>
                        </Suspense>
                    )}
                </motion.div>

                {/* Right – Text Content */}
                <motion.div
                    className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4 sm:gap-5"
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-xl">
                        Turn text to <span className="text-blue-500">images</span>, in seconds.
                    </h1>

                    <p className="text-base sm:text-lg text-gray-300 max-w-md">
                        Imagify is a free, open-source AI image generator. Unleash your creativity and create stunning images from text prompts.
                    </p>

                    <motion.button
                        className="text-sm sm:text-base text-gray-950 bg-white px-6 py-2 sm:px-8 sm:py-2 flex items-center gap-2 rounded-full cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8 }, duration: 1 }}
                        onClick={onClickHandler}
                    >
                        Generate Images
                        <img src={assets.star_group} alt="stars" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Header;
