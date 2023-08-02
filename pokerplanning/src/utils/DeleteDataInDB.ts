import {
  DocumentData,
  DocumentReference,
  deleteField,
  updateDoc,
} from "firebase/firestore";

export function deleteCurrentUser(
  roomRef: DocumentReference<DocumentData, DocumentData>,
  user: string
) {
  updateDoc(roomRef, {
    [user]: deleteField(),
  }).then(() => {
    window.sessionStorage.clear();
  });
}
