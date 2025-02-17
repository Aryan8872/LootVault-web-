import { Outlet } from 'react-router-dom'
import { NavBar } from '../Navbar'
import Footer from '../footer/Footer'

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />


      <div className=" flex flex-col gap-14  w-full justify-center py-6 bg-main_bg_color">
        <Outlet />
      </div>
      <Footer/>

    </div>
  )
}

export default RootLayout