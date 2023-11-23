export interface MessageRepository {
  // You may not need to use this function.
  createDoc(): void;
  addMessage(message: Map<string, string>): void;
  readSingleMessage(): void;
  listenMessages(): void;
  cancelSubscriptions(): void;
  queryMesssages(): void;
}
