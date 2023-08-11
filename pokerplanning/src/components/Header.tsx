import {lazy} from "react"
import meetingIcon from "../assets/meeting.png";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const  ChatScreenDrawer = lazy(()=>import( "./ChatScreenDrawer"));

export default function Header(props:any) {


  const theme = useSelector((state:RootState) => state.theme.value);

  return (
    <>
      <div className="navbar shadow-lg fixed text-center m-auto p-2 justify-between   " data-theme = {theme}>
        {/* Left Part */}
        <div className="">
          <img src={meetingIcon} alt="" width="48" />
          <div className="text-2xl font-bold ml-8">Sprint Spades</div>
        </div>

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
