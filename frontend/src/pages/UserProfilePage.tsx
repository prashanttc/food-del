import { UseGetMyUser, UseUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/UserProfileForm"

const UserProfilePage = () => { 
  const {currentUser, isLoading:isGetLoading } = UseGetMyUser();
  const {isLoading:isUpdateLoading ,UpdateUser} = UseUpdateMyUser();
 

  if(isGetLoading){
    <span>loading...</span>
  }
  if(!currentUser){
<span>Unable to load user profile</span>
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
