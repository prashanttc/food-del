import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi"
import ManageRestaurantForm from "@/forms/restaurantFrom/ManageRestaurantForm"

const ManageRestaurantPage = () => {
    const{restaurant} = useGetMyRestaurant()
    const{updateRestaurant , isLoading:updateloading} = useUpdateMyRestaurant()
    const{createRestaurant,isLoading:createloading} = useCreateMyRestaurant()
    const isEditing = !!restaurant;
  return (
  <ManageRestaurantForm 
  onSave={isEditing ? updateRestaurant : createRestaurant}
   restaurant={restaurant} 
   isLoading={createloading || updateloading}/>
  )
}

export default ManageRestaurantPage
