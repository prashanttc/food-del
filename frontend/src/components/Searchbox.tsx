import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "restaurant name is required"
    })
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchForm) => void;
    onReset?: () => void;
    placeHolder: string;
    searchQuery?: string;
}

const Searchbox = ({ onSubmit, onReset, searchQuery }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        form.reset({ searchQuery })
    }, [searchQuery , form, ])

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        })
        if (onReset) {
            onReset()
        }
    }
    return (
        <Form{...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-row items-center justify-between w-[80%]  gap-3 rounded-full p-3 mx-5  border-2`}>
                <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />
                <FormField control={form.control} name="searchQuery" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input {...field} className="border-none shadow-none text-xl focus-visible:ring-0" />
                        </FormControl>
                    </FormItem>
                )} />
                <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">reset</Button>
                <Button type="submit" className="rounded-full ">Search</Button>
            </form>
        </Form>
    )
}

export default Searchbox
