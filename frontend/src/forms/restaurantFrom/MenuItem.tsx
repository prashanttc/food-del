import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput";

const MenuItem = () => {

    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "MenuItems"
    })
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Menu</h2>
                <FormDescription>Create your menu and give each item a name and a price</FormDescription>
            </div>
            <FormField control={control} name="menuItems" render={() => (
                <FormItem className="flex flex-col gap-2">
                    {fields.map((_, index) => (
                        <MenuItemInput index={index} removeMenuItem={()=>remove(index)} />
                    ))}

                </FormItem>
            )} />
            <Button type="button" onClick={()=>append({name:"",price:""})} className="bg-green-500 max-h-fit hover:bg-green-600">Add MenuItem</Button>

        </div>
    )
}

export default MenuItem
