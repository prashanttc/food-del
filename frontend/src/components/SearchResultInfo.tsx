import { Link } from "react-router-dom";

type Props ={
    total:number;
    city:string;
}

const SearchResultInfo = ({city,total}:Props) => {
  return (
  <div>
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} restaurant found in {city}
        <Link to="/" className="text-sm font-semibold underline cursor-pointer text-blue-500"> Change Location</Link>
      </span>
    </div>
  </div>
  )
}

export default SearchResultInfo
