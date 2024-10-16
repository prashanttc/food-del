import { useSearchRestaurant } from "@/api/SearchRestaurantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PageSelector from "@/components/PageSelector";
import Searchbox, { SearchForm } from "@/components/Searchbox";
import SearchRestaurantCard from "@/components/SearchRestaurantCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDd from "@/components/SortOptionDd";
import { useState } from "react";
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string;
  page:number;
  sortOptions:string;
  selectedCuisines:string[];
}

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page:1,
    sortOptions:"bestMatch",
    selectedCuisines:[]
  })
  const[isExpand , setIsExpand] = useState<boolean>(false)
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page:1,
    
    }))

  }
  const setPage = (page:number)=>{
   setSearchState((prevState)=>({
    ...prevState,
    page
   }))
  }
  const setSelectedCuisine = (selectedCuisines:string[])=>{
   setSearchState((prevState)=>({
    ...prevState,
    selectedCuisines
   }))
  }
  const setSortOptions = (sortOptions:string)=>{
   setSearchState((prevState)=>({
    ...prevState,
    sortOptions
   }))
  }
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page:1
    }))

  }
  const { result } = useSearchRestaurant( searchState , city)
  if (!result?.data || !city) {
    return <span> no result found</span>
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 px-10">
      <div id="cuisines-list"><CuisinesFilter
       selectedCuisines={searchState.selectedCuisines} 
       onChange={setSelectedCuisine} 
       isExpanded={isExpand} 
       onExpandedClick={()=>setIsExpand((prevIsExpand)=> !prevIsExpand)}/> 
       </div>
      <div id="main-content" className="flex flex-col gap-5">
        <Searchbox
          onSubmit={setSearchQuery}
          searchQuery={searchState.searchQuery}
          placeHolder="search by restaurant aur cuisines"
          onReset={resetSearch} />
     <div className="flex  flex-col gap-4 md:flex-row justify-between">   <SearchResultInfo total={result.pagination.total} city={city} />
     <SortOptionDd   sortOptions={searchState.sortOptions} onChange={(value)=>setSortOptions(value)}/></div>
        {result.data.map((restaurant) => (
          <SearchRestaurantCard restaurant={restaurant} />
        ))}
        <PageSelector 
        page={result.pagination.page}
         pages={result.pagination.pages}
         onPageChange={setPage}
        />
      </div>

    </div>
  )
}

export default SearchPage
