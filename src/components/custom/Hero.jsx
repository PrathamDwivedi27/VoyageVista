import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-semibold text-[47px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalised Itineraries at your Fingertips{" "}
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Discover, book, and explore hidden gems with VoyageVista. Let us make
        your travel dreams a reality.
      </p>
      <Link to={'/create-trip'}>
        <Button>Get Started</Button>
      </Link>
      
    </div>
  );
};

export default Hero;
