import { doc, getFirestore } from "firebase/firestore";
import ChatContainer from "./ChatContainer";
import { app } from "../config/firebase.config";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { addErrorLogs } from "../utils/ErrorLogs";

export default function ChatScreenDrawer(props: any) {
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(false);
  const [messageIconClicked, setMessageIconClicked] = useState(false);
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);

  
  const db = getFirestore(app);
  const uuid = window.sessionStorage.getItem("uuid") || "null";
  const user = window.sessionStorage.getItem("user") || "";
  
  const chatRoomRef = doc(db, `Rooms_PokerPlanning_Chat`, uuid);
  const [value,,error] = useDocumentData(chatRoomRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(()=>{
    if(error){
      addErrorLogs("Sprint Spade: ChatScreenDrawer.tsx","error",new Date().toISOString(),JSON.stringify(error))
    }
  },[error])

  useEffect(() => {
      const sentBy = value?.chats[value?.chats.length - 1]["sentBy"];
      const messageCount = window.sessionStorage.getItem("messageCount") || "0";

    if (value) {
      if (value["chats"].length > +messageCount && !messageIconClicked && sentBy != user) {
        setIsIndicatorVisible(true);        
        const count = value["chats"].length - +messageCount;
        count > 1 && setUnreadMsgCount(count);
    }else{
        
        setIsIndicatorVisible(false);
      }
    }
  }, [value,messageIconClicked]);

  function handleMessageBtnClick() {
    setUnreadMsgCount(0);
    setMessageIconClicked(true);
    window.sessionStorage.setItem("messageCount",value?.chats.length+"");
  }
  return (
    <>
      <div className="drawer drawer-end" >
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className={`drawer-content text-right mr-4 ${props.className}`} >
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-sm"
            onClick={handleMessageBtnClick}
          >
            <div className="indicator">
              {isIndicatorVisible && (
                <span className="indicator-item badge badge-secondary">{unreadMsgCount < 2 ? "":unreadMsgCount}</span>
              )}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </span>
            </div>
          </label>
        </div>
        <div className="drawer-side" onClick={()=>{setMessageIconClicked(false)}}>
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ChatContainer payload = {value}/>
        </div>
      </div>
    </>
  );
}
