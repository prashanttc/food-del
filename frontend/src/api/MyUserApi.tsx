import { User } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const Apiurl = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

export const UseCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const CreateMyUserRequest = async (user: CreateUserRequest) => {
        const accesstoken = await getAccessTokenSilently()

        const response = await fetch(`${Apiurl}api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error("failed to create user")
        }
    }

    const {
        mutateAsync: CreateUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(CreateMyUserRequest)
    return {
        CreateUser,
        isLoading,
        isError,
        isSuccess
    }
}


type UpdateMyUserRequest = {
    name: string,
    addressLine1: string,
    city: string,
}
export const UseUpdateMyUser = () => {

    const { getAccessTokenSilently } = useAuth0()


    const UpdateMyUserRequest = async (formdata: UpdateMyUserRequest) => {
        const accesstoken = await getAccessTokenSilently();
        const response = await fetch(`${Apiurl}api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata)
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update user");
        }

    }
    const {
        mutateAsync: UpdateUser,
        isLoading,
        error,
        isSuccess,
        reset
    } = useMutation(UpdateMyUserRequest)

    if (isSuccess) {
        toast.success("user profile updated")
    }
    if (error) {
        toast.error("an error has occured")
        reset()
    }
    return {
        UpdateUser,
        isLoading
    }
}

export const UseGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const GetMyUserRequest = async ():Promise<User> => {
        const accesstoken = await getAccessTokenSilently()
        const response = await fetch(`${Apiurl}api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accesstoken}`,
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error("failed to fetch user.")
        }
        return response.json();
    }

    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery("fetchCurrentUser", GetMyUserRequest)
    if (error) {
        toast.error(error.toString())
    }
    return{
        isLoading,
        currentUser
    }
}