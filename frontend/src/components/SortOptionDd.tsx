import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";

type Props ={
    onChange:(value:string)=> void;
    sortOptions:string;
}

const SORT_OPTIONS =[
    {
        label:"Best Match",
        value:"bestMatch"
    },
    {
        label:"delivery price",
        value:"deliveryPrice"
    },
    {
        label:"estimated delivery time",
        value:"estimatedTime"
    },
]
const SortOptionDd = ({onChange , sortOptions}:Props) => {
const selectedLabel = SORT_OPTIONS.find((option)=>option.value === sortOptions)?.label || SORT_OPTIONS[0].label
  return (
   <DropdownMenu>
    <DropdownMenuTrigger className="cursor-pointer ">
        <Button variant="outline" className="w-full">sort by: {selectedLabel}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        {SORT_OPTIONS.map((option)=>(
            <DropdownMenuItem className="cursor-pointer"
            onClick={()=> onChange(option.value)}>
             {option.label}
            </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
   </DropdownMenu>
  )
}

export default SortOptionDd
