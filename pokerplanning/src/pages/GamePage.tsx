import {
  deleteField,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import BottomComponent from "../components/BottomComponent";
import Card from "../components/Card";
import StartGameCard from "../components/StartGameCard";
import { useDocument } from "react-firebase-hooks/firestore";
import { app } from "../config/firebase.config";
import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { deleteCurrentUser } from "../utils/DeleteDataInDB";

export default function GamePage() {
  let { uuidParam } = useParams();  

  const nav = useNavigate();

  const user = window.sessionStorage.getItem("user") || "";

  useEffect(()=>{
    if (!user) {
      window.sessionStorage.setItem("uuid",uuidParam || "");
      nav("/register", { state: { uuidState: uuidParam } });
    }

  })
  
  const db = getFirestore(app);
  const roomRef = doc(db, `Rooms_PokerPlanning`, uuidParam || "");
  const [value, loading, error] = useDocument(roomRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  

  const [messageIconClicked, setMessageIconClicked] = useState(false);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  const [allUserNames, setAllUserNames] = useState<string[]>([])
  
  const showData = (value?.data() || {})["showData"];

  let temp: any[] = [];

  let data: any = value?.data() || [];

  useEffect(()=>{
    if(!messageIconClicked){
      setShowNewMessageIndicator(true);
    }
  },[])

  useEffect(()=>{
    window.addEventListener('beforeunload',deleteUser)
    window.addEventListener('unload', deleteUser)
  return () => {
    window.removeEventListener('beforeunload', deleteUser)
    window.removeEventListener('unload', deleteUser)
  }
  })

  function deleteUser(){
    deleteCurrentUser(roomRef,user);
  }



  useEffect(() => {
    let dataSet: any = [];
    dataSet = value?.data() || [];
    setAllUserNames(Object.keys(dataSet));
    Object.keys(dataSet).map((key) => {
      temp.push({ [key]: dataSet[key] });
     
    });
  }, [value]);


  function handleMessageIconClick(clicked:boolean){    
    setMessageIconClicked(clicked);
  }

  return (
    <>
    <Header users = {allUserNames} payload = {data} messageIconClick = {handleMessageIconClick} newMessage = {showNewMessageIndicator}/>
    <div >
      <div
        id="app-container"
        className="flex gap-20 bg-slate-50 justify-evenly items-center flex-col h-screen"
      >
        <div className="flex gap-3 justify-center items-center flex-col ">
          <div id="user-card-top-container" className="flex gap-3">
            {/* {upperList.map((item, index: number) => (
              <Card key={index} cardLabel={Object.keys(item)[0]} />
            ))} */}
            {Object.keys(data)
              .filter((key) => key != "showData")
              .map((key, index: number) =>
                data["showData"] ? (
                  <Card
                    cardLabel={key}
                    key={index}
                    cardIcon={data[key].isSelected ? data[key].value : "😵‍💫"}
                  />
                ) : (
                  <Card
                    cardLabel={key}
                    key={index}
                    cardIcon={data[key].isSelected ? "✅" : "🤔"}
                  />
                )
              )}
          </div>
          <StartGameCard payload = {data}/>
          <div id="user-card-bottom-container" className="flex gap-3">
            {/* {lowerList.map((item, index: number) => (
              <Card key={index} cardLabel={Object.keys(item)[0]} />
            ))} */}
          </div>
        </div>
        <BottomComponent disabled = {showData} payload = {data}/>
      </div>
      <div>
      </div>
    </div>
    </>
  );
}
