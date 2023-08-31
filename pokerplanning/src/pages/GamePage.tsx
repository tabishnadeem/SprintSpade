import { useEffect, useState,lazy,Suspense } from "react";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../config/firebase.config";
import StartGameCard from "../components/StartGameCard";
import BottomComponent from "../components/BottomComponent";
const Card = lazy(()=>import("../components/Card"))
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Lottie from "lottie-react";
import thinkingAnimation from "../assets/thinking_animation.json";
import sleepingAnimation from "../assets/sleeping_animation.json";
import Toast from "../components/Toast";
import { addErrorLogs } from "../utils/ErrorLogs";

export default function GamePage() {
  let { uuidParam } = useParams();

  const nav = useNavigate();

  const user = window.sessionStorage.getItem("user") || "";
  const db = getFirestore(app);
  const roomRef = doc(db, `Rooms_PokerPlanning`, uuidParam || "");

  const [value, loading,error] = useDocument(roomRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [upperList, setUpperList] = useState<any[]>([]);
  const [lowerList, setLowerList] = useState<any[]>([]);

  const theme = useSelector((state: RootState) => state.theme.value);

  const [messageIconClicked, setMessageIconClicked] = useState(false);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  const [allUserNames, setAllUserNames] = useState<string[]>([]);

  const cardAnimation = (<span className="loading loading-ring loading-lg"></span>);

  useEffect(() => {
    isDocumentAvailable(uuidParam || "").then((isAvailable) => {
      if (isAvailable) {
        if (!user) {
          window.sessionStorage.setItem("uuid", uuidParam || "");
          nav("/register", { state: { uuidState: uuidParam } });
        } else {
          if (uuidParam !== window.sessionStorage.getItem("uuid")) {
            window.sessionStorage.setItem("uuid", uuidParam || "");
            nav("/register", { state: { uuidState: uuidParam } });
          }
        }
      } else {
        nav("/invalid", { replace: true });
      }
    });
  }, []);

  const showData = (value?.data() || {})["showData"];
  let data: any = value?.data() || [];
  // console.log('data',data)

  
  useEffect(()=>{
    if(error) addErrorLogs("Sprint Spade: GamPage.tsx","error",new Date().toISOString(),JSON.stringify(error))
  },[error])

useEffect(() => {
    if (!messageIconClicked) {
      setShowNewMessageIndicator(true);
    }
  }, []);

  
  useEffect(() => {

    setUpperLowerListsData();
    setAllUserNames(Object.keys(data));
    if(value){      
      addErrorLogs("Sprint Spade: GamePage.tsx","log",new Date().toISOString(),JSON.stringify(data))
      
    }
  }, [value]);

  useEffect(() => {

    if(value){
      if(upperList){
        addErrorLogs("SS:GamePage.tsx:UpperList","log",new Date().toISOString(),JSON.stringify(upperList))
      }else if(lowerList){
        addErrorLogs("SS:GamePage.tsx:LowerList","log",new Date().toISOString(),JSON.stringify(lowerList))
        
      }
    }
  }, [upperList,lowerList]);

  function setUpperLowerListsData(){
    let isUpper = true;
    let upperUsers = [];
    let lowerUsers = [];
    for (let user in data) {
      if (user !== "showData") {
        if (isUpper) {
          upperUsers.push(user);
          isUpper = false;
        } else {
          lowerUsers.push(user);
          isUpper = true;
        }
      }
    }

    upperUsers = upperUsers
      .map(
        (upperUser: string) =>
          upperUser[0].toUpperCase() + upperUser.substring(1)
      )
      .sort();
    lowerUsers = lowerUsers
      .map(
        (lowerUser: string) =>
          lowerUser[0].toUpperCase() + lowerUser.substring(1)
      )
      .sort();

    setUpperList(upperUsers);
    setLowerList(lowerUsers);

   
  }

  


  console.log('upperList',upperList)
  console.log('lowerList',lowerList)

  function handleMessageIconClick(clicked: boolean) {
    setMessageIconClicked(clicked);
  }

  async function isDocumentAvailable(docID: string) {
    let documents: string[] = [];
    const querySnapshot = await getDocs(collection(db, "Rooms_PokerPlanning"));
    querySnapshot.forEach((doc) => {
      documents.push(doc.id);
    });
    return documents.includes(docID);
  }

  return (
      <>
        <Header
          users={allUserNames}
          payload={data}
          uuid={uuidParam}
          messageIconClick={handleMessageIconClick}
          newMessage={showNewMessageIndicator}
        />
        <div data-theme={theme}>
          <div
            id="app-container"
            className="flex gap-20 justify-evenly items-center flex-col h-screen"
          >
            {/* Set to visible toast when clicked on Copy button */}
            <Toast />

            <div className="flex gap-3 mt-20 justify-center items-center flex-col ">
              <div id="user-card-top-container" className="flex gap-3">
                {loading && (
                  cardAnimation
                )}
                {upperList
                  .map((key, index: number) =>
                    data["showData"] ? (
                    <Suspense fallback={cardAnimation} key={index}>
                        <Card
                        cardLabel={key}
                        key={index}
                        cardIcon={
                          data[key].isSelected ? (
                            data[key].value
                          ) : (
                            <Lottie
                              animationData={sleepingAnimation}
                              style={{ height: 20, width: 20 }}
                            />
                          )
                        }
                      />
                    </Suspense>
                    ) : (
                      <Suspense fallback={cardAnimation} key={index}>
                        <Card
                          cardLabel={key}
                          key={index}
                          cardIcon={
                            data[key].isSelected ? (
                              "✅"
                            ) : (
                              <Lottie
                                animationData={thinkingAnimation}
                                style={{ height: 20, width: 20 }}
                              />
                            )
                          }
                        />
                      </Suspense>
                    )
                  )}
              </div>
              <StartGameCard payload={data} />
              <div id="user-card-bottom-container" className="flex gap-3">
                {lowerList
                  .map((key, index: number) =>
                    data["showData"] ? (
                      <Suspense fallback={cardAnimation} key={index}>
                        <Card
                        cardLabel={key}
                        key={index}
                        cardIcon={
                          data[key].isSelected ? (
                            data[key].value
                          ) : (
                            <Lottie
                              animationData={sleepingAnimation}
                              style={{ height: 20, width: 20 }}
                            />
                          )
                        }
                      />
                      </Suspense>
                    ) : (
                  <Suspense fallback={cardAnimation} key={index}>
                        <Card
                        cardLabel={key}
                        key={index}
                        cardIcon={
                          data[key].isSelected ? (
                            "✅"
                          ) : (
                            <Lottie
                              animationData={thinkingAnimation}
                              style={{ height: 20, width: 20 }}
                            />
                          )
                        }
                      />
                  </Suspense>
                    )
                  )}
              </div>
            </div>
            <BottomComponent disabled={showData} payload={data} />
          </div>
        </div>
      </>
  );
}
