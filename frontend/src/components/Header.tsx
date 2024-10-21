import { Link } from "react-router-dom"
import Mobilenav from "./Mobilenav.tsx"
import MainNav from "./MainNav.tsx"
import CenterMenu from "./CenterMenu.tsx"

const Header = () => {
  return (
    <div className="md:py-6 py-3 px-7 bg-orange-500  md:px-32 md:bg-white border-b-2 border-white md:mb-0 md:drop-shadow-md">
      <div className="container mx-auto  flex justify-between items-center ">
        <Link to="/" className="md:text-3xl text-lg font-bold md:text-orange-500 text-white tracking-tight ">
          eazyeats.com
        </Link>
        <div className="md:hidden  justify-center flex">
          <Mobilenav />
        </div>
        <div className="hidden md:block">
        <CenterMenu/>
        </div>
        <div className="hidden md:block">
          <MainNav/>
        </div>
      </div>
    </div>
  )
}

export default Header
