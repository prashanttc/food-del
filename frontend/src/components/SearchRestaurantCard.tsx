import { Restaurant } from "@/type";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant;
}
const SearchRestaurantCard = ({ restaurant }: Props) => {
    return (
        <Link to={`/details/${restaurant._id}`} className="grid lg:grid-cols-[2fr_3fr] gap-5 group">
            <AspectRatio ratio={16 / 6}>
                <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover bg-slate-500" />
            </AspectRatio>
            <div>
                <h1 className="tracking-tighter font-bold text-2xl mb-2 group-hover:underline">{restaurant.restaurantName}</h1>
                <div id="card-content" className="grid md:grid-cols-2 gap-2">
                    <div className="flex flex-row flex-wrap">
                        {restaurant.cuisines.slice(0, 8).map((item, index) => (
                            <span className="flex">
                                <span>{item}</span>
                                {index < Math.min(restaurant.cuisines.length, 8) - 1 && <Dot />}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-1 flex-col">
                        <div className="flex items-center gap-1 text-green-600 "><Clock className="text-green-600 size-5" />
                            {restaurant.estimatedTime}mins</div>
                        <div className="flex items-center gap-1">
                            <Banknote  className="size-5"/>
                            delivery from ₹ {restaurant.deliveryPrice}

                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default SearchRestaurantCard
