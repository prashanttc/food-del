import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrder, useUpdateMyRestaurant } from "@/api/MyRestaurantApi"
import OrderCard from "@/components/OrderCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManageRestaurantForm from "@/forms/restaurantFrom/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  const { restaurant } = useGetMyRestaurant()
  const { updateRestaurant, isLoading: updateloading } = useUpdateMyRestaurant()
  const { createRestaurant, isLoading: createloading } = useCreateMyRestaurant()
  const { orders } = useGetMyRestaurantOrder()
  const isEditing = !!restaurant
  return (

    <Tabs defaultValue="orders" className="mx-10">
      <TabsList >
        <TabsTrigger value="orders">Orders </TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage-Restaurant </TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-gray-50 p-  10 rounded-lg">
      <h2 className="text-2xl font-bold">{orders ? orders.length : 0} active orders</h2>
        {orders && orders.length > 0 ? (
          orders.map((order) => <OrderCard order={order} />) 
        ) : (
          <p>No active orders.</p>
        )}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={isEditing ? updateRestaurant : createRestaurant}
          restaurant={restaurant}
          isLoading={createloading || updateloading} />
      </TabsContent>
    </Tabs>
    //
  )
}

export default ManageRestaurantPage
