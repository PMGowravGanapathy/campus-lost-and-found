import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Camera, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/design-system/Button";
import { Input } from "../components/design-system/Input";
import { CategoryChip } from "../components/design-system/CategoryChip";
import { ItemCard } from "../components/design-system/ItemCard";
import { useItems } from "../../hooks/useItems";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

const categories = [
  { label: "Electronics", icon: "📱" },
  { label: "Bags", icon: "🎒" },
  { label: "Wallets", icon: "👛" },
  { label: "Keys", icon: "🔑" },
  { label: "Accessories", icon: "👓" },
  { label: "Other", icon: "📦" },
];

export const PostItemScreen: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"lost" | "found">("lost");
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createItem } = useItems();
  const { user } = useAuth();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !selectedCategory || !location) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!user) {
      toast.error("You must be logged in to post an item");
      return;
    }

    setIsSubmitting(true);
    try {
      await createItem({
        title,
        description,
        location,
        category: selectedCategory,
        type: status,
        status: "active",
        userId: user.uid,
        imageUrl: "", 
      }, imageFile || undefined);

      toast.success("Item posted successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Failed to post item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/home")}
          className="p-2 rounded-md bg-secondary/50 border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Post Item</h1>
          <p className="text-sm text-muted-foreground">Report a lost or found item to the campus.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Form Area */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-8">
            
            {/* Status Toggle */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Item Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStatus("lost")}
                  className={`h-12 rounded-md font-semibold transition-all border ${
                    status === "lost"
                      ? "bg-status-lost/10 text-status-lost border-status-lost/50"
                      : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
                  }`}
                >
                  Lost Item
                </button>
                <button
                  onClick={() => setStatus("found")}
                  className={`h-12 rounded-md font-semibold transition-all border ${
                    status === "found"
                      ? "bg-status-found/10 text-status-found border-status-found/50"
                      : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
                  }`}
                >
                  Found Item
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <CategoryChip
                    key={cat.label}
                    label={cat.label}
                    icon={cat.icon}
                    selected={selectedCategory === cat.label}
                    onClick={() => setSelectedCategory(cat.label)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Item Name"
                placeholder="e.g., iPhone 13 Pro Max"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">Description</label>
                <textarea
                  className="w-full bg-input-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 p-3 min-h-[100px]"
                  placeholder="Provide any identifying details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Input
                label="Location"
                placeholder="Where was it lost/found?"
                icon={<MapPin className="w-5 h-5" />}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Add Photo (Optional)</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-xl cursor-pointer bg-secondary/20 hover:bg-secondary/40 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload photo</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Post Item
            </Button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-5 hidden lg:block sticky top-24">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Live Preview</h3>
          <div className="w-[300px] pointer-events-none">
            <ItemCard
              id="preview"
              title={title || "Item Name"}
              category={selectedCategory}
              status={status}
              location={location || "Location"}
              timeAgo="Just now"
              imageUrl={imagePreviewUrl || "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=600"}
              verified={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
