import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Clock, Share2, Flag, MessageCircle, AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/design-system/Button";
import { StatusChip } from "../components/design-system/StatusChip";
import { ItemCard } from "../components/design-system/ItemCard";
import { getItemById, ItemData } from "../../services/itemService";
import { useItems } from "../../hooks/useItems";
import { toast } from "sonner";

export const ItemDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  const { items } = useItems();

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Failed to load item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center bg-background text-center px-4">
        <h2 className="text-xl font-bold text-foreground mb-2">Item Not Found</h2>
        <p className="text-muted-foreground mb-6">The item you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/home")}>Go Back Home</Button>
      </div>
    );
  }

  const similarItems = items.filter(i => i.category === item.category && i.id !== item.id).slice(0, 3);
  
  const formatTimeAgo = (date: any) => {
    if (!date) return "Just now";
    const seconds = Math.floor((new Date().getTime() - date.toDate().getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " min ago";
    return Math.floor(seconds) + "s ago";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate("/home")}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to items
        </button>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-2"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard!");
            }}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => toast.success("Item reported to administrators.")}
          >
            <Flag className="w-4 h-4" />
            Report
          </Button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Image */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-border rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-square relative">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <span className="text-8xl">📦</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <StatusChip status={item.type as 'lost' | 'found'} />
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold">
                {item.category}
              </span>
              <span className="text-xs text-muted-foreground">ID: {item.id?.slice(0,8).toUpperCase()}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">{item.title}</h1>
            
            <div className="flex flex-col gap-3 p-4 bg-secondary/30 rounded-xl border border-border mt-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{item.location}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{formatTimeAgo(item.createdAt)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.description || "No description provided."}
            </p>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-card">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-lg">
              {item.userId ? item.userId.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">User {item.userId?.slice(0, 4)}</p>
              <p className="text-xs text-muted-foreground">Posted {formatTimeAgo(item.createdAt)}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <Button
              size="lg"
              className="w-full gap-2 text-lg h-14"
              onClick={() => navigate(`/claim/${item.id}`)}
            >
              <MessageCircle className="w-5 h-5" />
              {item.type === "lost" ? "I Found This" : "This is Mine"}
            </Button>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg border border-border/50">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Never share personal info or passwords. Verify items in person.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Items Grid */}
      {similarItems.length > 0 && (
        <div className="pt-12 border-t border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarItems.map((similarItem) => (
              <ItemCard 
                key={similarItem.id}
                {...similarItem} 
                id={similarItem.id || ""}
                status={similarItem.type as 'lost'|'found'} 
                timeAgo={formatTimeAgo(similarItem.createdAt)}
                verified={false} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
