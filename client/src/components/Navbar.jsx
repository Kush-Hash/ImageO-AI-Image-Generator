import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
	const { user, setUser, setShowLogin, logout, credit } = useContext(AppContext);
	const navigate = useNavigate();

	return (
		<motion.div
			className='flex justify-between items-center py-4 px-6 sm:px-12 relative z-50 h-20 bg-transparent'
			initial={{ opacity: 0, y: -50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeIn' }}
			viewport={{ once: false }}
		>
			{/* Logo */}
			<Link to='/'>
				<img src={assets.logo2} alt="Logo" className='w-28 sm:w-36 lg:w-44' />
			</Link>

			{/* Right Side */}
			<div className='mr-0 md:mr-10 lg:mr-16'>
				{user ? (
					<div className='flex items-center gap-3 sm:gap-5'>
						{/* Credits Button */}
						<button
							onClick={() => navigate('/buy')}
							className='flex items-center gap-2 bg-white px-3 sm:px-5 py-1 sm:py-1.5 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer'
						>
							<img src={assets.credit_star} alt="" className='w-4' />
							<p className='text-xs sm:text-sm font-medium text-gray-600'>
								Credit left: {credit}
							</p>
						</button>

						{/* Greeting */}
						<p className='text-cyan-100 hidden sm:block'>Hi, {user.name}</p>

						{/* Profile Dropdown */}
						<div className='relative group'>
							<img
								src={assets.profile_icon}
								alt="Profile"
								className='w-10 drop-shadow cursor-pointer'
							/>
							<div className='absolute top-0 right-0 z-[100] text-black rounded hidden group-hover:block pt-12'>
								<ul className='bg-white shadow-lg rounded border text-sm'>
									<li
										className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
										onClick={() => {
											logout();
											navigate('/');
										}}
									>
										Logout
									</li>
								</ul>
							</div>
						</div>
					</div>
				) : (
					<div className='flex items-center gap-5 sm:gap-4'>
						<p
							className='cursor-pointer text-white hover:underline'
							onClick={() => navigate('/buy')}
						>
							Pricing
						</p>
						<motion.button
							className='bg-white text-gray-900 px-5 py-2 text-sm rounded-full cursor-pointer'
							onClick={() => setShowLogin(true)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Login
						</motion.button>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default Navbar;
