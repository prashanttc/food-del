import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'

const DetailSections = () => {
    const { control } = useFormContext();
    return (
        <div className='space-y-2'>
            <div>
                <h2 className='text-2xl font-bold'>Details</h2>
                <FormDescription>
                    Enter the deatails of your restaurant
                </FormDescription>
            </div>
                <FormField control={control}
                    name='restaurantName'
                    render={({ field }) => (<FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)} />

                <FormField control={control}
                    name='city'
                    render={({ field }) => (<FormItem className='md:max-w-[25%]'>
                        <FormLabel>city</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)} />

                <FormField control={control}
                    name='deliveryPrice'
                    render={({ field }) => (<FormItem className='md:max-w-[25%]'>
                        <FormLabel>delivery Price ⟨₹⟩</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder='1.50' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)} />
                    
                <FormField control={control}
                    name='estimatedTime'
                    render={({ field }) => (<FormItem className='md:max-w-[25%]'>
                        <FormLabel>estimated delivery time (minutes) </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder='30 min' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)} />
            </div>
    )
}

export default DetailSections
