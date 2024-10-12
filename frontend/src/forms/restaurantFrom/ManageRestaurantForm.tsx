import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSections from "./DetailSections";
import CuisineSection from "./CuisineSection";
import { Separator } from "@/components/ui/separator";
import MenuItem from "./MenuItem";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/type";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "restaurant name required"
    }),
    city: z.string({
        required_error: "city name required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price required",
        invalid_type_error: "must be a valid number"
    }),
    estimatedTime: z.coerce.number({
        required_error: "estimated time required",
        invalid_type_error: "must be a valid number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "select at least one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required")
    })
    ),
    imageUrl: z.string().optional(),
    imageFile:z.instanceof(File,{message:"image is required"}).optional(),
})
.refine((data)=> data.imageUrl || data.imageFile,{
    message:"either image url or imagefile must be provided",
    path:["imageFile"],
})
type RestaurantFormData = z.infer<typeof formSchema>
type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: Boolean;
    restaurant?:Restaurant;
}
const ManageRestaurantForm = ({ onSave, isLoading , restaurant }: Props) => { 
    const form = useForm<RestaurantFormData>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            cuisines:[],
            menuItems:[{name:"",price:0}],
        }
    })
    useEffect(() => {
    if(!restaurant){
        return;
    }
    const MenuItemFormatted = restaurant.menuItems.map((item)=>({
        ...item
    }))
    const updatedRestaurant = {...restaurant ,menuItems: MenuItemFormatted};
    form.reset(updatedRestaurant)
    }, [restaurant , form])

    const onSubmit = (formDataJson:RestaurantFormData)=>{
        const formData = new FormData();

        formData.append("restaurantName",formDataJson.restaurantName);
        formData.append("city",formDataJson.city);
        formData.append("estimatedTime",formDataJson.estimatedTime.toString());
        formData.append("deliveryPrice",formDataJson.deliveryPrice.toString());
        formDataJson.cuisines.forEach((cuisine ,index)=>{
            formData.append(`cuisines[${index}]`, cuisine)
        })
        formDataJson.menuItems.forEach((menuItem ,index)=>{
            formData.append(`menuItems[${index}][name]`,menuItem.name)
            formData.append(`menuItems[${index}][price]`,menuItem.price.toString())
        })
      if(formDataJson.imageFile){
          formData.append("imageFile",formDataJson.imageFile);
      }
        onSave(formData)
    }
    return(
        <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 bg-gray-50 p-10 rounded-lg">
            <DetailSections/>
            <Separator/>
            <CuisineSection />
            <Separator />
            <MenuItem />
            <Separator />
            <ImageSection/>
            {isLoading?<LoadingButton/>:<Button type="submit" className="bg-orange-500">Submit</Button>}
           </form>
        </Form>
    )
}

export default ManageRestaurantForm 