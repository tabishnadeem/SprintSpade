import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../config/firebase.config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IPayload from "../interfaces/IPayload";
import { RootState } from "../store";
import { useSelector } from "react-redux";


export default function StartGameCard(props: any) {
  const db = getFirestore(app);
  let { uuidParam } = useParams();
  const uuid = window.sessionStorage.getItem("uuid") || uuidParam || "";

  const [isPickACardTextIsVisible, setIsPickACardTextIsVisible] =
    useState(true);

  const showData = props.payload["showData"];

  useEffect(() => {
    checkIfAnyUserHasSelectedCard();
  }, [props.payload]);



  const handleClick = async (value: React.MouseEvent) => {
    const target = value.target as HTMLButtonElement;
    try {
      if (target.textContent === "Show Cards") {
        setShowDataFlagTrue();
      } else {
        resetDataInDB();
        setIsPickACardTextIsVisible(true);
      }
    } catch (error) {
      throw error;
    }
  };

  async function setShowDataFlagTrue() {
    try {
      await setDoc(
        doc(db, "Rooms_PokerPlanning", uuid),
        {
          showData: true,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function resetDataInDB() {
    const users = Object.keys(props.payload).filter((key) => key != "showData");
    let result = {};
    users.forEach((user) => {
      let tempObj: IPayload = {};
      tempObj[user] = { isSelected: false, value: "" };
      result = { ...result, ...tempObj };
    });

    try {
      await setDoc(
        doc(db, "Rooms_PokerPlanning", uuid),
        {
          ...result,
          showData: false,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function checkIfAnyUserHasSelectedCard() {
    const dataObjects = Object.keys(props.payload);

    for (let index = 0; index < dataObjects.length; index++) {
      const dataObject = props.payload[dataObjects[index]];
      if (dataObject.isSelected) {
        setIsPickACardTextIsVisible(false);
      }
    }
  }

  const theme = useSelector((state:RootState) => state.theme.value);

  return (
    <>
      <div className="card card-normal w-90 p-10 bg-base-100 shadow-md card-bordered " data-theme={theme}>
        <div className="card-body">
          {isPickACardTextIsVisible ? (
            <div>Start Picking a Card</div>
          ) : (
            <button
              onClick={(value) => handleClick(value)}
              className="btn btn-secondary"
            >
              {showData ? "Start New Game" : "Show Cards"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
