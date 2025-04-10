import { collection, doc, setDoc } from "firebase/firestore";
import {
  carouselImages,
  diseases,
  restaurants,
  slots,
} from "../store/diseases";
import { db } from "./firebaseConfig";

const diseasesData = diseases;

const uploadData = async () => {
  try {
    for (let i = 0; i < diseasesData.length; i++) {
      const disease = diseasesData[i];
      const docRef = doc(collection(db, "diseases"), `disease_${i + 1}`);
      await setDoc(docRef, disease);
    }
    console.log("Data uploaded");
  } catch (e) {
    console.log("Error uploading data", e);
  }
};

export default uploadData;
