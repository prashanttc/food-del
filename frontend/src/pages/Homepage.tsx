import phoneimg from "../../assets/landing.png"
import DOWNLOAD from "../../assets/appDownload.png"
import Searchbox, { SearchForm } from "@/components/Searchbox"
import { useNavigate } from "react-router-dom"
const Homepage = () => {
  const navigate = useNavigate()
  const handleSearchSubmit = (searchFormValues:SearchForm)=>{
    navigate({
      pathname:`/search/${searchFormValues.searchQuery}`
    })
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md md:p-8 py-8 flex flex-col gap-5 text-center items-center -mt-16">
        <h1 className="md:text-5xl text-3xl text-wrap font-bold tracking-tight text-orange-600">
            tuck into a takeaway today
        </h1>
        <span className="md:text-xl text-lg">food is just a click away!!</span>
        <Searchbox onSubmit={handleSearchSubmit} placeHolder="search by city or town"/>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={phoneimg} className="cursor-pointer"/>
        <div className="flex flex-col items-center justify-center text-center gap-4">
            <span className="tracking-tighter font-bold md:text-3xl text-xl">order takeaway even faster!</span>
            <span className="font-semibold mx-2 md:w-[60%]">download the eazyeats aap now for faster ordering and personalised recommendations</span>
            <img src={DOWNLOAD} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Homepage
