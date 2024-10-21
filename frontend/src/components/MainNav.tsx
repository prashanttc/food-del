import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import Usermenu from "./Usermenu";
import { Link } from "react-router-dom";
import basket_icon from "../../assets/basket_icon.png"

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <div className="flex gap-4">
         <Link to="order-status" className=" rounded-full h-7 w-7">
         <img className="object-fill h-full w-full" src={basket_icon} />
         </Link>
         <Usermenu /></div>
      ) : (
        <Button
          variant="ghost"
          className=" border-[1.5px] rounded-3xl px-5 hover:bg-orange-500 hover:text-white  border-orange-500 text-md "
          onClick={async () => await loginWithRedirect()}
        >
          Log in
        </Button>
      )}
    </div>
  );
};

export default MainNav;
