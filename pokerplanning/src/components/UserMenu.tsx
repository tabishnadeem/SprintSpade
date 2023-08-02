import { doc, getFirestore } from "firebase/firestore";
import "../styles/UserMenu.style.css";
import { deleteCurrentUser } from "../utils/DeleteDataInDB";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

export default function UserMenu({ user }: { user: string }) {
  const db = getFirestore(app);
  const uuid = window.sessionStorage.getItem("uuid") || "";
  const roomRef = doc(db, `Rooms_PokerPlanning`, uuid);

  const nav = useNavigate();

  function handleLogout() {
    window.sessionStorage.clear();
    deleteCurrentUser(roomRef, user);
    nav(`/`, { replace: true });
  }

  return (
    <>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <div id="userMenu">
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
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span>{user}</span>
          </div>
        </li>

        {/* Divider */}
        <hr />

        <li className="py-2">
          <div>
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>

            <div onClick={handleLogout}>Logout</div>
          </div>
        </li>
      </ul>
    </>
  );
}
