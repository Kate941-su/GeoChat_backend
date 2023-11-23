import { MessageRepositoryImpl } from "./message_repository_impl";

const messageRepositoryImpl = new MessageRepositoryImpl("");
console.log("HELLO WORLD!");
messageRepositoryImpl.addMessage();
