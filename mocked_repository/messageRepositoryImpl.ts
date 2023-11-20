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
import { MessageRepository } from "./messageRepository";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export class MessageRepositoryImpl implements MessageRepository {
  // Define Subscriptions To Cancel Lisning Streams When disposed
  dailySpecialUnsubscribe: any;
  unsubscribeCustomerOrders: any;
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  // Get FireStore Instance
  firestore = getFirestore();

  // Get Firestore Database Project
  specialOfTheDay = doc(this.firestore, "dailySpecial/2023-11-20");

  // Define table (like ORM object)
  ordersCollection = collection(this.firestore, "orders");

  // Constructor
  constructor() {
    console.log(console.log("Hello there, Firestore"));
  }
  // You don't have to put a prefix word 'function' in class.
  // Create Document
  async createDoc(): Promise<void> {
    const docData = {
      description: "A delicious vanilla latte",
      price: 3.99,
      milk: "Whole",
      vegan: false,
    };
    await setDoc(this.specialOfTheDay, docData, { merge: true })
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
  async addSingleDoc() {
    const newDoc = await addDoc(this.ordersCollection, {
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
  async readSingleDoc() {
    const mySnapshot = await getDoc(this.specialOfTheDay);
    if (mySnapshot.exists()) {
      const docData = mySnapshot.data();
      console.log(`My data is ${JSON.stringify(docData)}`);
    }
  }

  // Listen to change document on time.
  listenDocs() {
    this.dailySpecialUnsubscribe = onSnapshot(
      this.specialOfTheDay,
      (docSnampShot) => {
        if (docSnampShot.exists()) {
          const docData = docSnampShot.data();
          console.log(`In realtime, docData is ${JSON.stringify(docData)}`);
        } else {
          console.log("There is no docData");
        }
      }
    );
  }

  // Quit to listen to change DB change.
  cancelSubscription() {
    this.dailySpecialUnsubscribe();
    this.unsubscribeCustomerOrders();
  }

  // Query for database
  async queryDocs() {
    let customerOrdersQuery;
    try {
      customerOrdersQuery = query(
        collection(this.firestore, "orders"),
        where("drink", "==", "Latte"),
        limit(10)
      );
    } catch (error) {
      console.log(error);
    }
    this.unsubscribeCustomerOrders = onSnapshot(
      customerOrdersQuery,
      (querySnapshot) => {
        console.log(JSON.stringify(querySnapshot.docs.map((e) => e.data())));
      }
    );
  }
}
