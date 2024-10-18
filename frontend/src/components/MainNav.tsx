import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import Usermenu from "./Usermenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <div className="flex">
         <Link to="order-status" className="font-bold hover:text-orange-500"> Your Order</Link>
         <Usermenu /></div>
      ) : (
        <Button
          variant="ghost"
          className="hover:text-orange-500 hover:bg-white text-xl font-bold"
          onClick={async () => await loginWithRedirect()}
        >
          Log in
        </Button>
      )}
    </div>
  );
};

export default MainNav;
