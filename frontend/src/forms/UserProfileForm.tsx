import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/type";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "address is required"),
    city: z.string().min(1, "city is required"),

});



export type userFormData = z.infer<typeof formSchema>
type props = {
    currentUser:User;
    onSave: (userProfileData: userFormData) => void;
    isLoading: boolean;
    title?:string;
    buttontext?:string;

}

const UserProfileForm = ({ onSave, isLoading, currentUser , title="UserProfile" , buttontext="submit" }: props) => {
    const form = useForm<userFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    })
    useEffect(() => {
        form.reset(currentUser)
    },[form, currentUser])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-100 rounded-lg p-10 m-10">
                <div className="mb-10">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <FormField control={form.control} name="email" disabled render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input {...field} className="bg-white" /></FormControl><FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>name</FormLabel>
                        <FormControl><Input {...field} className="bg-white" /></FormControl> <FormMessage />
                    </FormItem>
                )} />
                <div className="flex flex-col md:flex-row gap-4 mt-5">
                    <FormField control={form.control} name="addressLine1" render={({ field }) => (
                        <FormItem>
                            <FormLabel>address Line 1</FormLabel>
                            <FormControl><Input {...field} className="bg-white" /></FormControl> <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                            <FormLabel>city</FormLabel>
                            <FormControl><Input {...field} className="bg-white" /></FormControl> <FormMessage />
                        </FormItem>
                    )} />
                </div>
                {isLoading ? <Button className="bg-orange-500"><Loader2 className="h-4 w-4 animate-spin"/></Button>: <Button type="submit" className="bg-orange-500 mt-5 hover:bg-orange-600 ">{buttontext}</Button>}
            </form>
        </Form>
    )
};
export default UserProfileForm;