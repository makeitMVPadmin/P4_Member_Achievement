import { database } from "../config/firebase.js";
import { addDoc, collection } from "firebase/firestore";

async function AddUser() {
  const docRef = await addDoc(collection(database, "Users"), {
    name: "Virgilio",
    country: "Venezuela",
  });

  console.log("The User ID is: " + docRef.id);
}

AddUser();
