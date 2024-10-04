import { UseCreateMyUser } from "@/api/MyUserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallback = () => {
    const { user } = useAuth0()
    const { CreateUser } = UseCreateMyUser()
const navigate  = useNavigate()
    const hasCreatedUser = useRef(false)
    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            CreateUser({ auth0Id: user.sub, email: user.email })
            hasCreatedUser.current = true;
            navigate("/");
        }
    }, [user , navigate , CreateUser])
    return (
        <div>
        </div>
    )
}

export default AuthCallback
