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
import { FIRENDS_ROOM_COLLECTION_NAME } from "../const_value/const_value";

export class MessageRepositoryImpl implements MessageRepository {
  // Define Subscriptions To Cancel Lisning Streams When disposed
  dailySpecialUnsubscribe: any;
  unsubscribeCustomerOrders: any;
  frinedsRoomId: string = "abcdefg";
  app: FirebaseApp;
  firestore: Firestore;
  mockedFriendRoom: DocumentReference;
  messages: CollectionReference;

  // Constructor
  constructor(friendsRoomId: string) {
    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore();
    // this.frinedsRoomId = friendsRoomId;
    console.log(console.log("Hello there, Firestore"));
    // Get Firestore Database Project
    console.log(`${FIRENDS_ROOM_COLLECTION_NAME}/${this.frinedsRoomId}`);
    this.mockedFriendRoom = doc(
      this.firestore,
      `${FIRENDS_ROOM_COLLECTION_NAME}/${this.frinedsRoomId}`
    );
    this.messages = collection(this.firestore, "message/");
  }

  // Define table (like ORM object)

  // You don't have to put a prefix word 'function' in class.
  // Create Document
  async createDoc(): Promise<void> {
    const docData = {
      description: "A delicious vanilla latte",
      price: 3.99,
      milk: "Whole",
      vegan: false,
    };
    await setDoc(this.mockedFriendRoom, docData, { merge: true })
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
  async addMessage() {
    const newDoc = await addDoc(this.messages, {
      friend_room_id: this.frinedsRoomId,
      message_id: "dummy_message_id",
      message_text: "dummy_text",
      sent_datetime: Date.now(),
      status: "offline",
    })
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
