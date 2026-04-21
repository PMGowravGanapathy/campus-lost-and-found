import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface MessageData {
  id?: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: any;
}

let mockMessages: MessageData[] = [
  {
    id: "msg-1",
    chatId: "mock-1",
    senderId: "other",
    text: "Hi! I think I found your item.",
    createdAt: { toDate: () => new Date(Date.now() - 60000) }
  }
];

const mockListeners: Record<string, ((messages: MessageData[]) => void)[]> = {};

const getMessagesCollection = () => collection(db, "messages");

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
  if (!isFirebaseConfigured) {
    const newMsg = {
      id: "msg-" + Date.now(),
      chatId,
      senderId,
      text,
      createdAt: { toDate: () => new Date() }
    };
    mockMessages.push(newMsg);
    
    // Notify listeners
    const msgs = mockMessages.filter(m => m.chatId === chatId);
    if (mockListeners[chatId]) {
      mockListeners[chatId].forEach(cb => cb(msgs));
    }
    
    // Simulate other person replying
    setTimeout(() => {
      const replyMsg = {
        id: "msg-" + (Date.now() + 1),
        chatId,
        senderId: "other",
        text: "I see! Let's meet at the library.",
        createdAt: { toDate: () => new Date() }
      };
      mockMessages.push(replyMsg);
      const updatedMsgs = mockMessages.filter(m => m.chatId === chatId);
      if (mockListeners[chatId]) {
        mockListeners[chatId].forEach(cb => cb(updatedMsgs));
      }
    }, 2000);
    
    return { id: newMsg.id };
  }

  return await addDoc(getMessagesCollection(), {
    chatId,
    senderId,
    text,
    createdAt: serverTimestamp()
  });
};

export const subscribeToMessages = (chatId: string, callback: (messages: MessageData[]) => void) => {
  if (!isFirebaseConfigured) {
    if (!mockListeners[chatId]) mockListeners[chatId] = [];
    mockListeners[chatId].push(callback);
    
    // Initial fetch
    callback(mockMessages.filter(m => m.chatId === chatId));
    
    return () => {
      mockListeners[chatId] = mockListeners[chatId].filter(cb => cb !== callback);
    };
  }

  const q = query(
    getMessagesCollection(), 
    where("chatId", "==", chatId), 
    orderBy("createdAt", "asc")
  );
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MessageData));
    callback(messages);
  });
};
