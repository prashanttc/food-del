import profile_icon from "../../assets/profile_icon.png"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"


const Usermenu = () => {
    const { logout } = useAuth0()
    return (
        <div>
            <DropdownMenu>  
                <DropdownMenuTrigger className="flex items-center px-3 gap-4 font-bold hover:text-orange-500 ">
              
              <div className="rounded-full h-8 w-8 flex items-center justify-center ">
              <img className="h-7 w-6" src={profile_icon} alt="" />
              </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link to="/user-profile" className="hover:text-orange-500 font-bold py-2">User-profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link to="/my-restaurant" className="hover:text-orange-500 font-bold py-2">my-restaurant</Link>
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem>
                        <Button className="flex flex-1 font-bold bg-orange-500 hover:bg-orange-600" onClick={() => logout()}>
                            Log out
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Usermenu
