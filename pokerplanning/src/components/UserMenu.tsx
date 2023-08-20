import { doc, getFirestore } from "firebase/firestore";
import "../styles/UserMenu.style.css";
import { deleteCurrentUser } from "../utils/DeleteDataInDB";
import { app } from "../config/firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/theme/themeSlice";
import { useEffect, useRef, useState } from "react";

export default function UserMenu({ user }: { user: string }) {
  const db = getFirestore(app);
  let { uuidParam } = useParams();
  const uuid = window.sessionStorage.getItem("uuid") || uuidParam || "";
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const theme = window.localStorage.getItem("theme") || "light";
  useEffect(() => {
    if (theme === "dark") {
      setChecked(true);
    }
  });

  const roomRef = doc(db, `Rooms_PokerPlanning`, uuid);

  const nav = useNavigate();

  function handleLogout() {
    window.sessionStorage.clear();
    deleteCurrentUser(roomRef, user);
    nav(`/`, { replace: true });
  }

  function handleToggleTheme(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    if (target.checked) {
      //enable dark mode
      dispatch(toggleDarkMode("dark"));
    } else {
      //disable dark mode
      dispatch(toggleDarkMode("light"));
      setChecked(false);
    }
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
            {checked ? (
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
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
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
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}

            <input
              type="checkbox"
              ref={ref}
              checked={checked}
              className="toggle"
              data-toggle-theme="light,dark"
              data-act-class="ACTIVECLASS"
              onChange={(event) => {
                handleToggleTheme(event);
              }}
            />
          </div>
        </li>

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
