import { Progress } from "@/components/ui/progress";
import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const{isAuthenticated,isLoading}= useAuth0()

    if(isLoading){
      return <Progress className="mt-[20%] w-[9%] mx-auto "  color="white" value={63}/>;
    }
    if(isAuthenticated){
      return <Outlet />
    }

    return <Navigate to="/" replace/>
}

export default ProtectedRoute
