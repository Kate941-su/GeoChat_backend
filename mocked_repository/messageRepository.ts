export interface MessageRepository {
  createDoc(): void;
  addSingleDoc(): void;
  readSingleDoc(): void;
  listenDocs(): void;
  cancelSubscription(): void;
  queryDocs(): void;
}
