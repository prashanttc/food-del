import { CircleUserRound, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger, } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobileLinks from "./MobileLinks"

const Mobilenav = () => {
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="md:text-orange-500  text-white size-5" />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ?
                       <>
                        <span className="flex items-center px-3 gap-4 font-bold hover:text-orange-500 ">
                            <CircleUserRound className="text-orange-500" />
                            {user?.name}</span>
                       </>
                        :
                        <span> welcome to eazyeats.com!</span>}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? <MobileLinks /> : <Button className="flex-1 font-bold bg-orange-500 hover:bg-orange-600" onClick={async () => await loginWithRedirect()}>log in</Button>}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default Mobilenav
