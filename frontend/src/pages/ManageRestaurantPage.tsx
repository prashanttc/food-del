import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrder, useUpdateMyRestaurant } from "@/api/MyRestaurantApi"
import OrderItemCard from "@/components/orderItemCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ManageRestaurantForm from "@/forms/restaurantFrom/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  const { restaurant } = useGetMyRestaurant()
  const { updateRestaurant, isLoading: updateloading } = useUpdateMyRestaurant()
  const { createRestaurant, isLoading: createloading } = useCreateMyRestaurant()
  const { orders } = useGetMyRestaurantOrder()
  const isEditing = !!restaurant;
  return (

    <Tabs defaultValue="orders">
      <TabsList >
        <TabsTrigger value="orders">Orders </TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage-Restaurant </TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-gray-50 p-  10 rounded-lg">
        <h2 className="tetx-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => <OrderItemCard order={order} />)}
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
