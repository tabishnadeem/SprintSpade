import Lottie from "lottie-react"
import noInternet from "../assets/no-internet.json"
export default function NoInternet(){
    return(
        <>
        <div className="w-full flex justify-evenly items-center flex-col h-screen">
        <Lottie animationData={noInternet}/>
        <h2 className="font-light text-3xl">Oops..! Looks like You've lost Connection!</h2>
        <button className="btn btn-primary w-40" onClick={()=>location.reload()}>Reload</button>
        </div>
        </>
    )
}