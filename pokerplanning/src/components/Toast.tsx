import { useEffect } from "react";
import correct from "../assets/correct.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleVisiblity } from "../redux/toast/toastVisibilitySlice";

export default function Toast() {
  const visible = useSelector(
    (state: RootState) => state.toastVisibility.visible
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleVisiblity(false));
    }, 4000);
  });
  const children = (
    <>
      <div
        id="toast-simple"
        role="alert"
        className="flex p-4 z-50 top-10 right-1/2 translate-x-1/2 absolute text-gray-500 bg-gray-100 divide-x divide-gray-200 rounded-lg shadow"
      >
        <img src={correct} alt="" />
        <div className="pl-4 text-sm font-normal">Room ID Copied!</div>
      </div>
    </>
  );
  return (
    <>
      {visible && (
        <motion.div
          className="container absolute top-0 z-50"
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 10 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 8,
          }}
          children={children}
        />
      )}
    </>
  );
}
