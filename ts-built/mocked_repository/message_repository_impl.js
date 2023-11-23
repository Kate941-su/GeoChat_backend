"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepositoryImpl = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var firebase_const_1 = require("../const_value/firebase_const");
var const_value_1 = require("../const_value/const_value");
var MessageRepositoryImpl = /** @class */ (function () {
    // Constructor
    function MessageRepositoryImpl(friendsRoomId) {
        this.frinedsRoomId = "abcdefg";
        this.app = (0, app_1.initializeApp)(firebase_const_1.firebaseConfig);
        this.firestore = (0, firestore_1.getFirestore)();
        // this.frinedsRoomId = friendsRoomId;
        console.log(console.log("Hello there, Firestore"));
        // Get Firestore Database Project
        console.log("".concat(const_value_1.FIRENDS_ROOM_COLLECTION_NAME, "/").concat(this.frinedsRoomId));
        this.mockedFriendRoom = (0, firestore_1.doc)(this.firestore, "".concat(const_value_1.FIRENDS_ROOM_COLLECTION_NAME, "/").concat(this.frinedsRoomId));
        this.messages = (0, firestore_1.collection)(this.firestore, "message/");
    }
    // Define table (like ORM object)
    // You don't have to put a prefix word 'function' in class.
    // Create Document
    MessageRepositoryImpl.prototype.createDoc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var docData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docData = {
                            description: "A delicious vanilla latte",
                            price: 3.99,
                            milk: "Whole",
                            vegan: false,
                        };
                        return [4 /*yield*/, (0, firestore_1.setDoc)(this.mockedFriendRoom, docData, { merge: true })
                                .then(function () {
                                console.log("This value has been written to the database");
                            })
                                .catch(function (error) {
                                console.log("I got an error! ".concat(error));
                            })
                                .finally(function () {
                                console.log("Finish set Doc !");
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Add Document
    MessageRepositoryImpl.prototype.addMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, firestore_1.addDoc)(this.messages, {
                            friend_room_id: this.frinedsRoomId,
                            message_id: "dummy_message_id",
                            message_text: "dummy_text",
                            sent_datetime: Date.now(),
                            status: "offline",
                        })
                            .then(function () {
                            console.log("<Add A New Document> has been written to the database");
                        })
                            .finally(function () {
                            console.log("Finish addANewDocument !!");
                        })];
                    case 1:
                        newDoc = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageRepositoryImpl.prototype.readSingleMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mySnapshot, docData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, firestore_1.getDoc)(this.mockedFriendRoom)];
                    case 1:
                        mySnapshot = _a.sent();
                        if (mySnapshot.exists()) {
                            docData = mySnapshot.data();
                            console.log("My data is ".concat(JSON.stringify(docData)));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Listen to change document on time.
    MessageRepositoryImpl.prototype.listenMessages = function () {
        this.dailySpecialUnsubscribe = (0, firestore_1.onSnapshot)(this.mockedFriendRoom, function (docSnampShot) {
            if (docSnampShot.exists()) {
                var docData = docSnampShot.data();
                console.log("In realtime, docData is ".concat(JSON.stringify(docData)));
            }
            else {
                console.log("There is no docData");
            }
        });
    };
    // Quit to listen to change DB change.
    MessageRepositoryImpl.prototype.cancelSubscriptions = function () {
        this.dailySpecialUnsubscribe();
        this.unsubscribeCustomerOrders();
    };
    // Query for database
    MessageRepositoryImpl.prototype.queryMesssages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customerOrdersQuery;
            return __generator(this, function (_a) {
                try {
                    customerOrdersQuery = (0, firestore_1.query)((0, firestore_1.collection)(this.firestore, "orders"), (0, firestore_1.where)("drink", "==", "Latte"), (0, firestore_1.limit)(10));
                }
                catch (error) {
                    console.log(error);
                }
                this.unsubscribeCustomerOrders = (0, firestore_1.onSnapshot)(customerOrdersQuery, function (querySnapshot) {
                    console.log(JSON.stringify(querySnapshot.docs.map(function (e) { return e.data(); })));
                });
                return [2 /*return*/];
            });
        });
    };
    return MessageRepositoryImpl;
}());
exports.MessageRepositoryImpl = MessageRepositoryImpl;
