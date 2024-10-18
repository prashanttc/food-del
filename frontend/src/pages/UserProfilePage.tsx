import { UseGetMyUser, UseUpdateMyUser } from "@/api/MyUserApi"
import LoadingButton from "@/components/LoadingButton";
import UserProfileForm from "@/forms/UserProfileForm"

const UserProfilePage = () => { 
  const {currentUser, isLoading:isGetLoading } = UseGetMyUser();
  const {isLoading:isUpdateLoading ,UpdateUser} = UseUpdateMyUser();
 

  if(isGetLoading){
    return <LoadingButton/>
  }
  
  if(!currentUser){
return <span>Unable to load user profile</span>
  }
  return (
    <div>
      <UserProfileForm
       currentUser={currentUser} 
       onSave={UpdateUser} 
       isLoading={isUpdateLoading} />
    </div>
  )
}

export default UserProfilePage
