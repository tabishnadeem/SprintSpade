import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import { app } from "../config/firebase.config";
import { useNavigate, useLocation } from "react-router-dom";

export default function UsernameModal({ visible = false }) {
  const [userName, setUserName] = useState("");
  const [loader, setLoader] = useState(false);

  const nav = useNavigate();
  const { state } = useLocation();
  const db = getFirestore(app);
  
  let uuid = window.sessionStorage.getItem("uuid") || state.uuidState || "";
  if (!uuid) {
    uuid = state.uuidState;
    window.sessionStorage.setItem("uuid", uuid);
  }
  
  async function handleDone(event: any) {
    event.preventDefault();
    setLoader(true);
    try {
      await createRoomAndUserToDB();
      window.sessionStorage.setItem("user", userName);
      window.sessionStorage.setItem("messageCount", "0");
      setLoader(false);
      nav(`/room/${uuid}`, { replace: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } 

  async function createRoomAndUserToDB(){
    const roomRef = doc(db, `/Rooms_PokerPlanning/`, uuid);
    const roomData = {
      [userName]: {
        isSelected: false,
        value: "",
      },
    };
    await setDoc(roomRef, roomData, { merge: true });
  }

  return (
    <>
      <dialog id="my_modal_1" className="modal" open={visible}>
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-xl">Enter your Username!</h3>
          <p className="py-4">
            To be recognized by others, please enter your username.
          </p>
          <input
            type="text"
            placeholder="Type here"
            value={userName}
            onChange={(input) => setUserName(input.target.value)}
            className="input input-bordered input-secondary w-full max-w-sm"
          />
          <div className="modal-action">
            <button
              className={`btn + ${loader && "loading loading-dots"}`}
              onClick={(event) => handleDone(event)}
            >
              Done
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
