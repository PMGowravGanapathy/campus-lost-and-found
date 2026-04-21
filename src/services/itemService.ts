import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from "./firebase";

export interface ItemData {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  type: "lost" | "found";
  category: string;
  location: string;
  userId: string;
  createdAt?: any;
  status: "active" | "claimed";
}

let mockItems: ItemData[] = [
  {
    id: "mock-1",
    title: "iPhone 14 Pro",
    description: "Space Gray iPhone 14 Pro with a clear MagSafe case.",
    imageUrl: "https://images.unsplash.com/photo-1546540120-63fa610a795b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "lost",
    category: "Electronics",
    location: "Library 2nd Floor",
    userId: "mock-user",
    createdAt: { toDate: () => new Date() },
    status: "active"
  },
  {
    id: "mock-2",
    title: "Blue North Face Backpack",
    description: "Found a blue backpack in the cafeteria.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    type: "found",
    category: "Bags",
    location: "Cafeteria",
    userId: "mock-user-2",
    createdAt: { toDate: () => new Date(Date.now() - 86400000) },
    status: "active"
  }
];

let claims: any[] = [];

// Use a getter for collections so it doesn't crash on module load if db is {}
const getItemsCollection = () => collection(db, "items");
const getClaimsCollection = () => collection(db, "claims");

export const getItems = async (): Promise<ItemData[]> => {
  if (!isFirebaseConfigured) return [...mockItems].reverse();
  const q = query(getItemsCollection(), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ItemData));
};

export const getItemById = async (id: string): Promise<ItemData | null> => {
  if (!isFirebaseConfigured) return mockItems.find(i => i.id === id) || null;
  const itemDoc = doc(db, "items", id);
  const snapshot = await getDoc(itemDoc);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as ItemData;
  }
  return null;
};

export const postItem = async (data: Omit<ItemData, "createdAt" | "id">) => {
  if (!isFirebaseConfigured) {
    const newItem = {
      ...data,
      id: "mock-" + Date.now(),
      createdAt: { toDate: () => new Date() }
    };
    mockItems.push(newItem);
    return { id: newItem.id };
  }
  return await addDoc(getItemsCollection(), {
    ...data,
    createdAt: serverTimestamp()
  });
};

export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!isFirebaseConfigured) {
    return URL.createObjectURL(file);
  }
  const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export interface ClaimData {
  itemId: string;
  claimantId: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: any;
}

export const createClaim = async (data: Omit<ClaimData, "createdAt">) => {
  if (!isFirebaseConfigured) {
    claims.push({ ...data, id: "claim-" + Date.now(), createdAt: new Date() });
    return { id: "claim-" + Date.now() };
  }
  return await addDoc(getClaimsCollection(), {
    ...data,
    createdAt: serverTimestamp()
  });
};
