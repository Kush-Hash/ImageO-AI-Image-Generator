import { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import '../pages/Result.css';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const { generateImage } = useContext(AppContext);

    const onSubmithandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setIsImageLoaded(false);
        if (inputText) {
            const image = await generateImage(inputText);
            if (image) {
                setIsImageLoaded(true);
                setImage(image);
            }
        }
        setLoading(false);
    };

    // Custom download with prompt-based filename
    const handleDownload = () => {
        if (!image || !inputText) return;
        const link = document.createElement('a');
        link.href = image;
        link.download = `${inputText.replace(/\s+/g, '_')}.png`; // filename from prompt
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col bg-gray-950 justify-center items-center">
            <motion.form
                onSubmit={onSubmithandler}
                className="flex flex-col min-h-[90vh] items-center pt-10 gap-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeIn' }}
                viewport={{ once: false }}
            >
                {/* IMAGE BLOCK */}
                <motion.div
                    className="relative w-74 sm:w-120 rounded-lg overflow-visible"
                    style={{
                        boxShadow: loading
                            ? "0 0 80px rgba(255,255,255,0.6)"
                            : "0 0 50px rgba(255,255,255,0.3)"
                    }}
                    animate={{
                        boxShadow: loading
                            ? [
                                "0 0 50px rgba(255,255,255,0.3)",
                                "0 0 80px rgba(255,255,255,0.6)",
                                "0 0 100px rgba(255,255,255,0.8)",
                                "0 0 80px rgba(255,255,255,0.6)",
                                "0 0 50px rgba(255,255,255,0.3)"
                            ]
                            : "0 0 50px rgba(255,255,255,0.3)"
                    }}
                    transition={{
                        duration: loading ? 2 : 0.3,
                        repeat: loading ? Infinity : 0,
                        ease: 'easeInOut',
                    }}
                >
                    {/* BLUE AURA (only during loading) */}
                    {loading && (
                        <motion.div
                            className="absolute inset-0 -z-10 rounded-full bg-blue-400/40 blur-3xl"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    )}

                    {/* IMAGE + PROGRESS BAR */}
                    <div className="relative">
                        <img src={image} alt="" className="rounded w-full" />
                        <span
                            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading
                                ? 'w-full transition-all duration-[10s]'
                                : 'w-0'
                                }`}
                        />
                    </div>
                </motion.div>

                {/* LOADING TEXT */}
                {loading && (
                    <p className="text-lg font-medium mix-blend-difference text-white mt-2">
                        Loading...
                    </p>
                )}

                {/* INPUT BLOCK */}
                {!isImageLoaded && !loading && (
                    <div className="flex w-90 sm:w-140 bg-white text-black text-base mt-5 p-0.5 rounded-full border-2 border-black shadow-lg">
                        <input
                            type="text"
                            placeholder="Describe what you want to generate"
                            className="flex-1 bg-transparent ml-2 sm:ml-8 w-full max-sm:w-15 placeholder-style outline-none text-sm sm:text-lg"
                            onChange={(e) => setInputText(e.target.value)}
                            value={inputText}
                        />
                        <button
                            type="submit"
                            className="bg-zinc-900 px-4 sm:px-16 py-3 rounded-full text-white cursor-pointer"
                        >
                            Generate
                        </button>
                    </div>
                )}

                {/* ACTION BUTTONS */}
                {isImageLoaded && !loading && (
                    <div className="flex gap-2 flex-wrap justify-center items-center text-white text-sm p-0.5 mt-5 rounded-full">
                        <p
                            className="bg-white text-black px-8 py-3 rounded-full cursor-pointer font-medium hover:scale-[1.01] border-2 border-black"
                            onClick={() => setIsImageLoaded(false)}
                        >
                            Generate Another
                        </p>
                        <button
                            onClick={handleDownload}
                            className="bg-blue-500 text-white px-8 py-3 rounded-full cursor-pointer font-medium hover:scale-[1.01]"
                        >
                            Download
                        </button>
                    </div>
                )}
            </motion.form>
        </div>
    );
};

export default Result;
