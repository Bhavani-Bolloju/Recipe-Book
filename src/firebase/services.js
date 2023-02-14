import {
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getUserByUserId = async function (uid) {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const doc = await getDocs(q);
  const data = { ...doc.docs[0].data(), docId: doc.docs[0].id };
  return data;
};

export const toggleBookMark = async function (docId, bookmark, details) {
  const data = doc(db, "users", docId);

  await updateDoc(
    data,
    bookmark
      ? {
          bookmarkedRecipe: arrayRemove(details),
        }
      : {
          bookmarkedRecipe: arrayUnion(details),
        }
  );

  // console.log(docId, bookmark, details);
};
