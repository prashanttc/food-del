import { Restaurant } from "@/type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Dot } from "lucide-react"

type Props={
    restaurant: Restaurant
}

const CardInfo = ({restaurant}:Props) => {
  return (
    <Card className="border-slate-300">
<CardHeader>
 <CardTitle className="text-3xl font-bold tracking-tighter">
    {restaurant.restaurantName}
    </CardTitle>    
    <CardDescription>
            {restaurant.city}
    </CardDescription>
</CardHeader>
<CardContent className="flex">
    {restaurant.cuisines.map((item,index)=>(
        <span className="flex">
            <span>{item}</span>
        {index< restaurant.cuisines.length -1 && <Dot/>}
        </span>
    ))}

</CardContent>
    </Card>
  )
}

export default CardInfo
