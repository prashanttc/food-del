import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import Usermenu from "./Usermenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <Usermenu />
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
