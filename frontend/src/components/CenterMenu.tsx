import { Link } from "react-router-dom"

const CenterMenu = () => {
  return (
    <div className="flex gap-4">
    <Link to="/" className="font-md hover:text-orange-500 hover:border-b-2 hover:border-orange-500  hover:scale-105 duration-75 "> Home</Link>
     <Link to="/" className="font-md hover:text-orange-500 hover:border-b-2 hover:border-orange-500 hover:scale-105 duration-75"> Menu</Link>
     <Link to="/my-restaurant" className="font-md hover:text-orange-500 hover:border-b-2 hover:border-orange-500 hover:scale-105 duration-75"> My Restaurant</Link>
     <Link to="/" className="font-md hover:text-orange-500 hover:border-b-2 hover:border-orange-500 hover:scale-105 duration-75"> Contact Us</Link>
    </div>
  )
}

export default CenterMenu
