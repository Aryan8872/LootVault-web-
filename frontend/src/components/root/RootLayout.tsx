import { Outlet } from 'react-router-dom'
import { NavBar } from '../Navbar'

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />


      <div className=" flex flex-col gap-14  w-full justify-center py-6 bg-main_bg_color">
        <Outlet />
      </div>

    </div>
  )
}

export default RootLayout