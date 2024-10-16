import { cuisineList } from "@/config/restaurant-order-list";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";


type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
}
const CuisinesFilter = ({ onChange, isExpanded, onExpandedClick, selectedCuisines }: Props) => {


    const handlecuisineReset = () => onChange([])
    const handlecuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
        const ClickedCuisine = event.target.value;
        const isChecked = event.target.checked;
        const newCuisineList = isChecked ?
            [...selectedCuisines, ClickedCuisine]
            : selectedCuisines.filter((cuisine) => cuisine !== ClickedCuisine);
        onChange(newCuisineList)
    }

    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filter bu Cuisines</div>
                <div className="text-sm font-semibold cursor-pointer mb-2 underline  text-blue-500" onClick={handlecuisineReset}>reset filter</div>
               
            </div> <div className="space-y-2 flex flex-col">{cuisineList.slice(0,isExpanded? cuisineList.length:7).map((cuisine) => {
                    const isSelected = selectedCuisines.includes(cuisine)
                    return (
                        <div className="flex">
                            <Input
                                className="hidden"
                                type="checkbox"
                                id={`cuisine_${cuisine}`}
                                value={cuisine} checked={isSelected}
                                onChange={handlecuisineChange}
                            />
                            <Label htmlFor={`cuisine_${cuisine}`} className={`px-4 py-2 flex flex-1  items-center rounded-full cursor-pointer text-sm font-semibold 
                                     ${isSelected ? "text-green-500  border border-green-600"
                                    : "border border-slate-300"}`}>
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {cuisine}
                            </Label>
                        </div>)
                })}
                <Button variant="link" className="mt-4 flex-1" onClick={onExpandedClick}>
                    {isExpanded?(
                        <span className="flex items-center flex-row">
                            View less <ChevronUp/>
                        </span>
                    ):(  <span className="flex items-center flex-row">
                        View more <ChevronDown/>
                    </span>
                )}
                </Button>
                </div>
        </>
    )
}

export default CuisinesFilter
