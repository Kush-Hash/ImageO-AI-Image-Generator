import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { assets } from '../assets/assets';
import './carousal.css';

const Carousal = () => {
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Monitor scroll inside carousal section
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ['start start', 'end start']
    });
    const x = useTransform(
        scrollYProgress,
        [0, 0.08, 0.8, 1],
        ['0%', '0%', '-55%', '-55%']
    );

    const images = [
        assets.sample_img_1,
        assets.sample_img_2,
        assets.sample_img_1,
        assets.sample_img_2,
        assets.sample_img_2,
    ];

    return (
        <div className="carousal" ref={scrollRef}>
            {/* Background */}
            <motion.div className="carousel-background relative">
                <img
                    src={assets.blob_scene}
                    alt="Carousel Background"
                    className="background-image"
                />
                <div className="background-overlay" />
            </motion.div>

            {/* Content */}
            <div className="contentContainer">
                <motion.div className="images" style={{ x }}>
                    {images.map((src, index) => (
                        <div className="image-item" key={index}>
                            <img src={src} alt={`AI Generated Image ${index + 1}`} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Carousal;