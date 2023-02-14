import {
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
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

  console.log(docId, bookmark, details);

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
};

export const isBookMarked = async function (uid, recipeId) {
  const docRef = query(collection(db, "users"), where("uid", "==", uid));
  const docSnap = await getDocs(docRef);
  const user = docSnap.docs[0].data();

  const status = user.bookmarkedRecipe.some(
    (recipe) => recipe.recipeId == recipeId
  );
  return status;
};
