import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const{isAuthenticated}= useAuth0()
  return (
    <div>
      {isAuthenticated?<Outlet />:<Navigate to ="/" replace />}
    </div>
  )
}

export default ProtectedRoute
