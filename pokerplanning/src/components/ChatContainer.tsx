import {
  Timestamp,
  arrayUnion,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { app } from "../config/firebase.config";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import noMessageAnimation from "../assets/no_message_animation.json";

export default function ChatContainer(props:any) {
  const db = getFirestore(app);
  let { uuidParam } = useParams();
  const uuid = window.sessionStorage.getItem("uuid") || uuidParam || "";
  const user = window.sessionStorage.getItem("user") || "";
 
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [inputMessage, setInputMessage] = useState("");

  async function handleSendMessageBtnClick() {
    setInputMessage("");
    try {
      if(inputMessage){
        const chatRoomRef = doc(db, `/Rooms_PokerPlanning_Chat/`, uuid);
        const chatRoomData = {
          chats: arrayUnion({
            message: inputMessage,
            sentBy: user,
            sentAt: Timestamp.fromDate(new Date()),
          }),
        };
        await setDoc(chatRoomRef, chatRoomData, { merge: true });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleKeyDownEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSendMessageBtnClick();
    }
  }

  useEffect(() => {
    scrollToBottom();
  },[props.payload]);

  return (
    <>
      <div className=" flex flex-col gap-5 justify-between relative w-max p-2 bg-white border h-full border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <div className="card w-96 h-full overflow-y-auto bg-base-100 ">
          <div className="card-body p-2">
            {props.payload ? (
              props.payload["chats"].map((payload: any, index: number) =>
                payload.sentBy === user ? (
                  <div className="chat chat-end" key={index}>
                    <div className="chat-bubble">{payload.message}</div>
                  </div>
                ) : (
                  <div key={index} className="chat chat-start">
                    <div className="chat-image avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-7">
                        <span className="text-md">{payload.sentBy[0]}</span>
                      </div>
                    </div>
                    <div className="chat-header">{payload.sentBy}</div>
                    <div className="chat-bubble">{payload.message}</div>
                    <div className="chat-footer">
                      <time className="text-xs opacity-50">
                        {new Date(payload.sentAt.toDate()).toLocaleTimeString()}
                      </time>
                    </div>
                  </div>
                )
              )
            ) : (
              <>
                <Lottie animationData={noMessageAnimation} loop />
                <div className="text-lg font-semibold">
                  Send a Message to Start Collaborating
                </div>
              </>
            )}
          </div>
        </div>
        <div className="">
          <div className="flex ">
            <input
              type="text"
              value={inputMessage}
              onChange={(event) => setInputMessage(event.target.value)}
              placeholder="Type here"
              onKeyDown={handleKeyDownEvent}
              className="input rounded-r-none  w-full overflow-scroll"
            />
            <button
              className=" btn rounded-l-none "
              onClick={handleSendMessageBtnClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
