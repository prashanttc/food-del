import type { MenuItem } from "../type"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
    menuItem: MenuItem;
    addtoCart:()=>void;
}
const MenuItemForCard = ({ menuItem  ,addtoCart}: Props) => {
    return (
        <Card className="cursor-pointer" onClick={addtoCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                {menuItem.price}₹
            </CardContent>
        </Card>
    )
}

export default MenuItemForCard
