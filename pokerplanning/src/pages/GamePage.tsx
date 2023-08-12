import {
  collection,
  doc,
  getDocs,
  getFirestore,
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
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Lottie from "lottie-react"
import thinkingAnimation from "../assets/thinking_animation.json"
import sleepingAnimation from "../assets/sleeping_animation.json"


export default function GamePage() {
  let { uuidParam } = useParams();  

  const nav = useNavigate();

  const user = window.sessionStorage.getItem("user") || "";
  const db = getFirestore(app);
  const roomRef = doc(db, `Rooms_PokerPlanning`, uuidParam || "");
  const [value, loading, error] = useDocument(roomRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  async function isDocumentAvailable(docID:string){
    let documents:string[] = [];
    const querySnapshot = await getDocs(collection(db, "Rooms_PokerPlanning"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    documents.push(doc.id);
    // console.log(doc.id, " => ", doc.data());
  });
  return documents.includes(docID);
  }

  
  
  useEffect(()=>{
    
    console.log('value',value?.id);
    isDocumentAvailable(uuidParam || "").then((isAvailable)=>{

      if(isAvailable){
        if (!user) {
          window.sessionStorage.setItem("uuid",uuidParam || "");
          nav("/register", { state: { uuidState: uuidParam } });
        }else{
          console.log('uuidSS',window.sessionStorage.getItem("uuid"));
          console.log('uuidParam',uuidParam);
          
          if(uuidParam !== window.sessionStorage.getItem("uuid")){
            window.sessionStorage.setItem("uuid",uuidParam || "");
            nav("/register", { state: { uuidState: uuidParam } });
            
          }
        }
      }else{
        nav('/invalid',{replace:true})
      }
    })

  })

  const theme = useSelector((state:RootState) => state.theme.value);
  

  
  

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
    // window.addEventListener('beforeunload',()=>deleteUser("1st function"))
    window.addEventListener('unload', ()=>deleteUser("2nd function"))
  return () => {
    window.removeEventListener('beforeunload', ()=>deleteUser("3rd function"))
    window.removeEventListener('unload', ()=>deleteUser("4th function"))
  }
  })

  function deleteUser(mssg:string){
    console.log('mssg',mssg);
    
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
    <div data-theme={theme}>
      <div
        id="app-container"
        className="flex gap-20 justify-evenly items-center flex-col h-screen"
      >
        <div className="flex gap-3 justify-center items-center flex-col ">
          <div id="user-card-top-container" className="flex gap-3">
            {/* {upperList.map((item, index: number) => (
              <Card key={index} cardLabel={Object.keys(item)[0]} />
            ))} */}
            {
              loading && <span className="loading loading-ring loading-lg"></span>
            }
            {Object.keys(data)
              .filter((key) => key != "showData")
              .map((key, index: number) =>
                data["showData"] ? (
                  <Card
                    cardLabel={key}
                    key={index}
                    cardIcon={data[key].isSelected ? data[key].value : (
                      <Lottie animationData={sleepingAnimation} style={{height:20,width:20}}/>

                    )}
                  />
                ) : (
                  <Card
                    cardLabel={key}
                    key={index}
                    cardIcon={data[key].isSelected ? "✅" : (
                      <Lottie animationData={thinkingAnimation} style={{height:20,width:20}}/>
                    )}
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
