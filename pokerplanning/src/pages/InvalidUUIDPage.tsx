import { Link } from "react-router-dom";
import InvalidUUIDAnimation from "../assets/invalid_uuid_animation.json";
import Lottie from "lottie-react";
export default function InvalidUUIDPage() {
  return (
    <>
    <div className="text-center flex flex-col justify-center items-center gap-10 mt-10">

      <Lottie
        animationData={InvalidUUIDAnimation}
        style={{ width: 500 }}
      />
      <h3 className=" tracking-tight inline font-semibold from-[#5EA2EF] to-[#0072F5] text-4xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-b">
        UUID may be Invalid or Not Found
      </h3>
      <Link to={'/'} replace={true}>
      
      <button className="btn btn-primary w-40">Back to Home</button>
      </Link>

    </div>

    </>
  );
}
