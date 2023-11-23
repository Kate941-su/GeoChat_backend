// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
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
  Firestore,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore";

import { firebaseConfig } from "../const_value/firebase_const";
import { MessageRepository } from "./message_repository";

export class MessageRepositoryImpl implements MessageRepository {
  // Define Subscriptions To Cancel Lisning Streams When disposed
  dailySpecialUnsubscribe: any;
  unsubscribeCustomerOrders: any;
  app: FirebaseApp;
  firestore: Firestore;
  mockedFriendRoom: DocumentReference;
  mockedMessageDatas: DocumentReference;
  messageCollection: CollectionReference;

  // Constructor
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.app);
    console.log(console.log("Hello there, Firestore"));
    // Get Firestore Database Project
    this.mockedMessageDatas = doc(this.firestore, `message/id_here`);
    this.messageCollection = collection(this.firestore, "message/");
  }

  // Define table (like ORM object)

  // You don't have to put a prefix word 'function' in class.
  // Create Document
  async createDoc(): Promise<void> {
    const docData = {
      frined_room_id: "dummy_id",
      message_id: "dummy_message_id",
      message_text: "dummy_message_text",
      sent_datetime: "dummy_time_stamp",
      status: "dummy_status",
    };
    await setDoc(this.mockedMessageDatas, docData, { merge: true })
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
  async addMessage(message: Map<string, string>) {
    const newDoc = await addDoc(this.messageCollection, message)
      .then(() => {
        console.log("<Add A New Document> has been written to the database");
      })
      .finally(() => {
        console.log("Finish addANewDocument !!");
      });
  }
  async readSingleMessage() {
    const mySnapshot = await getDoc(this.mockedFriendRoom);
    if (mySnapshot.exists()) {
      const docData = mySnapshot.data();
      console.log(`My data is ${JSON.stringify(docData)}`);
    }
  }

  // Listen to change document on time.
  listenMessages() {
    this.dailySpecialUnsubscribe = onSnapshot(
      this.mockedFriendRoom,
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
  cancelSubscriptions() {
    this.dailySpecialUnsubscribe();
    this.unsubscribeCustomerOrders();
  }

  // Query for database
  async queryMesssages() {
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
