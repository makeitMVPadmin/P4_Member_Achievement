import { database } from "../config/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAllDocumentsFromCollection(collectionName) {
  const DataRef = await getDocs(collection(database, collectionName));

  let DataArray = [];

  DataRef.forEach((doc) => {
    DataArray.push({ id: doc.id, ...doc.data() });
  });

  return DataArray;
}

async function saveCollectionToJSON(collectionName, filePath) {
  try {
    const docs = await getAllDocumentsFromCollection(collectionName);
    fs.writeFileSync(filePath, JSON.stringify(docs, null, 2), "utf8");
    console.log(`Datos guardados en ${filePath}`);
  } catch (error) {
    console.error("Error al obtener y guardar los documentos:", error);
  }
}

// Example:
const filePath = path.join(__dirname, "../data/Users.json");
saveCollectionToJSON("Users", filePath);
