import { useState, useEffect, useCallback } from "react";
import { getItems, postItem, uploadImage, ItemData } from "../services/itemService";
import { toast } from "sonner";

export const useItems = () => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getItems();
      setItems(data);
    } catch (err: any) {
      console.error("Error fetching items:", err);
      setError(err.message || "Failed to fetch items");
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (data: Omit<ItemData, "createdAt" | "id">, imageFile?: File) => {
    try {
      let imageUrl = data.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, `items/${data.userId}`);
      }

      const newItem = await postItem({ ...data, imageUrl });
      
      // Update local state optimistic UI
      setItems((prev) => [
        { id: newItem.id, ...data, imageUrl, createdAt: new Date() } as ItemData,
        ...prev
      ]);
      
      return newItem.id;
    } catch (err: any) {
      console.error("Error creating item:", err);
      throw err;
    }
  };

  return { items, loading, error, fetchItems, createItem };
};
