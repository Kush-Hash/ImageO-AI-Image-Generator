import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify';

const App = () => {

  const { showLogin } = useContext(AppContext);

  return (
    <>
      {/* Navbar Section */}
      <div className='px-4 sm:px-10 md:px-14 lg:px-16 xl:px-28 2xl:px-32 bg-gray-950 '>
        <ToastContainer position='bottom-right' />
        <Navbar />
      </div>

      {showLogin && <Login />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>

      {/* Footer */}
      <div className='w-full overflow-hidden'>
        <Footer />
      </div>
    </>
  )
}
export default App;