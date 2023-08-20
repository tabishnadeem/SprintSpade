import { Link } from "react-router-dom";
import fourNotfourImage from "../assets/four-not-four.svg";

export default function ErrorPage() {

  return (
    <div className="flex justify-center gap-5 flex-col items-center  h-screen">
      <img className="" src={fourNotfourImage} alt="404 Error" width={700} />
      <h3 className="font-light text-xl">Try Reloading the Page</h3> 
      <span className="divider mx-auto w-1/4">OR</span>
      <Link to={"/"} replace={true}>
        <button className="btn btn-primary w-40 " onClick={()=>sessionStorage.clear()}>Back to Home</button>
      </Link>
    </div>
  );
}
