import {lazy} from "react"
import meetingIcon from "../assets/meeting.png";
import Avatar from "./Avatar";

const  ChatScreenDrawer = lazy(()=>import( "./ChatScreenDrawer"));

export default function Header(props:any) {
  return (
    <>
      <div className="navbar fixed text-center m-auto p-2 w-screen justify-between  bg-slate-50 ">
        {/* Left Part */}
        <div className="">
          <img src={meetingIcon} alt="" width="48" />
          <div className="text-2xl font-bold ml-8">Sprint Spades</div>
        </div>

        {/* Center Part */}
        {/* <div className="text-2xl font-bold ml-56">Sprint Spades</div> */}

        {/* Right Part */}
        <div className="flex flex-row-reverse items-center gap-2">
          <Avatar users={props.users}/>

          <div>
            <ChatScreenDrawer payload = {props.payload} messageIconClick={props.messageIconClick} className="m-auto" newMessage = {props.newMessage}/>
          </div>
        </div>
      </div>
    </>
  );
}
