import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cuisineList } from "@/config/restaurant-order-list"
import { useFormContext } from "react-hook-form"
import CuisineCheckbox from "./CuisineCheckbox"

const CuisineSection = () => {
    const {control} = useFormContext()
  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl">Cuisines</h2>
        <FormDescription>select the cuisines your restaurant serves.</FormDescription>
      </div>
      <FormField control={control} name="cuisines" render={({field})=>(
        <FormItem>
<div className="grid md:grid-cols-5 gap-1">
    {cuisineList.map((CuisineItem)=>(
        <CuisineCheckbox cuisine={CuisineItem} field={field} />
    ))}
</div>
<FormMessage/>
        </FormItem>
      )} />
    </div>
  )
}

export default CuisineSection
