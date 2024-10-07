import Navigation from './pages/Auth/Navigation'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
function App() {

  return (
    <>
    <ToastContainer/>
    <Navigation/>
    <main className="py-3">
      <Outlet/>  
    </main>
    </>
  )
}

export default App

// universal packeges - npm i nodemon multer mongoose jsonwebtoken express-formidable express-async-handler express dotenv cookie-parser concurrently bcryptjs        

// npm i slick-carousel react-slick react-toostify react-router-dom react-redux react-icons apexcharts react-apexcharts moment flowbite axios @reduxjs/toolkit @paypal/react-paypal-js
