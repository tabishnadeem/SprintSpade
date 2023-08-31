import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../config/firebase.config";

export async function addErrorLogs(
  title: string,
  type: string,
  timeStamp?: string,
  data?: string
) {
  console.log("error logs db triggered")
  const db = getFirestore(app);
  try {
    await addDoc(collection(db, "ErrorLogs"), {
      title,
      type,
      timeStamp,
      data,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
