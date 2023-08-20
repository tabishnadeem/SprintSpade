import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

export default function LoadingComponent() {
  return (
    <div>
      <Lottie animationData={loadingAnimation} className="h-screen w-auto" />
    </div>
  );
}
