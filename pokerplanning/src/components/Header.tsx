import { lazy } from "react";
import meetingIcon from "../assets/meeting.svg";
import Avatar from "./Avatar";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleVisiblity } from "../redux/toast/toastVisibilitySlice";

const ChatScreenDrawer = lazy(() => import("./ChatScreenDrawer"));

export default function Header(props: any) {
  const theme = useSelector((state: RootState) => state.theme.value);

  const dispatch = useDispatch();

  function handleCopyButton(){
    dispatch(toggleVisiblity(true));
    window.navigator.clipboard.writeText(location.href)
  }

  return (
    <>
      <div
        id="navbar"
        className="navbar shadow-lg fixed text-center m-auto p-2 justify-between   "
        data-theme={theme}
      >
        {/* Left Part */}
        <div className="">
          <img src={meetingIcon} alt="" width="48" />
        <div id="title" style={{fontFamily:"titleFont"}} className="text-2xl ml-2 ">Sprint Spades</div>
        </div>

        {/* Center Part */}
        <div className="flex gap-4">
          <div style={{fontFamily:'uuidFont'}}>
            {props.uuid.substring(0,props.uuid.indexOf("-"))}
          </div>
        <div style={{width:"0.1px"}} className="h-8 bg-slate-500 opacity-30"></div> 
          <div className="cursor-pointer" onClick={handleCopyButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
          />
        </svg>
          </div>
        </div>

        {/* Right Part */}
        <div className="flex flex-row-reverse items-center gap-2">
          <Avatar users={props.users} />

          <div>
            <ChatScreenDrawer
              payload={props.payload}
              messageIconClick={props.messageIconClick}
              className="m-auto"
              newMessage={props.newMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
