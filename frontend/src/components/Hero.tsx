import { useAuth0 } from "@auth0/auth0-react";
import hero from "../../assets/header_img.png";
import { Button } from "./ui/button";



const Hero = () => {
  const{isAuthenticated , loginWithRedirect}= useAuth0()
  const handleScroll = () => {
    window.scrollTo({
      top: 500, // Replace with your desired scroll position
      behavior: 'smooth',
    })}
  return (
    <div
      className="bg-cover bg-center md:w-[85%] h-[30vw] min-h-[200px] md:rounded-xl md:m-auto max-h-[600px] "
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="md:flex  text-white flex-col p-[5vw] hidden gap-5">
      <div className="text-6xl flex flex-col gap-2">
      <h1 className="font-semibold ">Order your </h1>
      <h1 className="font-semibold ">favourite food here </h1>
      </div>
        <span className="text-[1.1vw] w-[70%]">Welcome to easyeats, your go-to food delivery app for quick, fresh, and delicious meals delivered right to your doorstep. Explore a variety of cuisines, from local favorites to international delights, all with easy ordering and fast delivery. </span>
        {isAuthenticated?<Button variant="ghost" className="w-fit py-6 bg-white text-black px-6 tex-sm rounded-3xl " onClick={handleScroll}>Order Now</Button>:
        <Button  variant="ghost" className="w-fit py-6 bg-white text-black px-6 tex-sm rounded-3xl" onClick={()=>loginWithRedirect()} >Sign in</Button>
        }
      </div>
      <div className="md:hidden flex h-full justify-center items-center">
        <h1 className="text-3xl font-bold text-white">EasyEats</h1>
      </div>
    </div>
  );
};

export default Hero;
