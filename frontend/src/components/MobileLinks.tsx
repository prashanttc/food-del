import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"


const MobileLinks = () => {
    const {logout} = useAuth0()
  return (
    <div className="flex flex-col gap-4">
         <Link to="/user-profile" className="hover:text-orange-500 font-bold text-xl text-black py-2">User-profile</Link>
      <Button className="flex flex-1 bg-orange-500 hover:bg-orange-600 font-bold items-center px-3" onClick={()=>{logout()}}>Log out</Button>
    </div>
  )
}

export default MobileLinks
