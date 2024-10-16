import { SearchState } from "@/pages/SearchPage";
import { SearchRestaurant } from "@/type";
import { useQuery } from "react-query";

const Apiurl = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (searchState: SearchState , city?:string) => {
    const SearchRestaurantRequest = async ():Promise<SearchRestaurant>=> {
        const params = new URLSearchParams()
        params.set("searchQuery" , searchState.searchQuery)
        params.set("page" , searchState.page.toString())
        params.set("sortOption" , searchState.sortOptions)
        params.set("selectedCuisines" , searchState.selectedCuisines.join(","))
        const response = await fetch(`${Apiurl}api/restaurant/search/${city}?${params.toString()}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            }
        })
        if (!response.ok) {
            throw new Error("error fetching restaurant")
        }

        return response.json();
    
    }

    const{data:result , isLoading} = useQuery(
        ["SearchRestaurant", searchState],
         SearchRestaurantRequest,
        )
    return { result,isLoading}
}