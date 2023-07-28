import Card from "./Card";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../config/firebase.config";
import "../styles/BottomComponent.style.css";
import { useEffect, useState } from "react";
export default function BottomComponent(props: any) {
  const tempValues = [1, 2, 3, 5, 8, 13, 21, 22, 34, 53];

  const [previousCardIndex, setPreviousCardIndex] = useState(-1);

  const db = getFirestore(app);
  const user = window.sessionStorage.getItem("user") || "";
  const uuid = window.sessionStorage.getItem("uuid") || "";

  const handleClick = async (value: Event, index: number) => {
    const target = value.target as HTMLDivElement;

    addElevatedStylingToClickedCard(index);
    await setCardValueToDB(target);
  };

  function addElevatedStylingToClickedCard(index: number) {
    let prevCard = document.querySelectorAll("#bottomCard")[previousCardIndex];
    if (prevCard) {
      prevCard.classList.remove("card-selected");
    }
    let card = document.querySelectorAll("#bottomCard")[index];

    card.classList.add("card-selected");
    setPreviousCardIndex(index);
  }

  useEffect(() => {
    selectCardIfUserHasClickedBefore();
  }, [props.payload]);

  function selectCardIfUserHasClickedBefore() {
    let selectedValue = props.payload[user]?.value;
    let cards = document.querySelectorAll("#bottomCard");
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i] as HTMLDivElement;
      if (card.textContent === selectedValue) {
        card.classList.add("card-selected");
        setPreviousCardIndex(i);
        break;
      }
    }
  }

  async function setCardValueToDB(divElem: HTMLDivElement) {
    try {
      await setDoc(
        doc(db, "Rooms_PokerPlanning", uuid),
        {
          [user]: {
            isSelected: true,
            value: divElem.textContent,
          },
        },
        { merge: true }
      );

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <div className={`flex gap-3 ${props.className}`}>
        {tempValues.map((value, index) => (
          <Card
            className={`border-0 card-bottom w-10`}
            isBottomCard
            id="bottomCard"
            cardLabel={value + ""}
            key={index}
            disabled={props.disabled}
            onClick={(value: Event) => {
              handleClick(value, index);
            }}
          />
        ))}
      </div>
    </>
  );
}
