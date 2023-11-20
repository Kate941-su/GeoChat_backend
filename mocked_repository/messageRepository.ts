// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  limit,
  where,
  orderBy,
} from "firebase/firestore";

import { firebaseConfig } from "../firebase_const";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get FireStore Instance
const firestore = getFirestore();

// Get Firestore Database Project
const specialOfTheDay = doc(firestore, "dailySpecial/2023-11-20");

// Define table (like ORM object)
const ordersCollection = collection(firestore, "orders");

//Define Subscriptions To Cancel Lisning Streams When disposed .
let dailySpecialUnsubscribe;
let unsubscribeCustomerOrders;

// Create New Document.
async function writeDailySpecail() {
  const docData = {
    description: "A delicious vanilla latte",
    price: 3.99,
    milk: "Whole",
    vegan: false,
  };
  await setDoc(specialOfTheDay, docData, { merge: true })
    .then(() => {
      console.log("This value has been written to the database");
    })
    .catch((error) => {
      console.log(`I got an error! ${error}`);
    })
    .finally(() => {
      console.log("Finish set Doc !");
    });
}

// Add Document
async function addANewDocument() {
  const newDoc = await addDoc(ordersCollection, {
    customer: "Auther",
    drink: "Latte",
    total_cost: (100 + Math.floor(Math.random() * 400)) / 100,
  })
    .then(() => {
      console.log("<Add A New Document> has been written to the database");
    })
    .finally(() => {
      console.log("Finish addANewDocument !!");
    });
}

async function readASingleDocument() {
  const mySnapshot = await getDoc(specialOfTheDay);
  if (mySnapshot.exists()) {
    const docData = mySnapshot.data();
    console.log(`My data is ${JSON.stringify(docData)}`);
  }
}

function listenToADocument() {
  dailySpecialUnsubscribe = onSnapshot(specialOfTheDay, (docSnampShot) => {
    if (docSnampShot.exists()) {
      const docData = docSnampShot.data();
      console.log(`In realtime, docData is ${JSON.stringify(docData)}`);
    } else {
      console.log("There is no docData");
    }
  });
}

// Quit to listen to change DB change.
function cancelMyListenerAtTheAppropriateTime() {
  dailySpecialUnsubscribe();
  unsubscribeCustomerOrders();
}

// Query for database
async function queryForDocuments() {
  let customerOrdersQuery;
  try {
    customerOrdersQuery = query(
      collection(firestore, "orders"),
      where("drink", "==", "Latte"),
      limit(10)
    );
  } catch (error) {
    console.log(error);
  }
  unsubscribeCustomerOrders = onSnapshot(
    customerOrdersQuery,
    (querySnapshot) => {
      console.log(JSON.stringify(querySnapshot.docs.map((e) => e.data())));
    }
  );
}

/*
    Demonstration
*/
console.log("Hello there, Firestore");
// writeDailySpecail();
addANewDocument();
readASingleDocument();
listenToADocument();
queryForDocuments();
