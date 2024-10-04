import { Link } from "react-router-dom"
import Mobilenav from "./Mobilenav.tsx"
import MainNav from "./MainNav.tsx"

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/" className="text-3xl font-bold text-orange-500 tracking-tight">
          eazyeats.com
        </Link>
        <div className="md:hidden mr-5 justify-center flex">
          <Mobilenav />
        </div>
        <div className="hidden md:block">
          <MainNav/>
        </div>
      </div>
    </div>
  )
}

export default Header
