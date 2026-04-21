import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Search, PackageSearch, Activity, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";
import { ItemCard } from "../components/design-system/ItemCard";
import { CategoryChip } from "../components/design-system/CategoryChip";
import { useItems } from "../../hooks/useItems";

const categories = [
  { label: "All", icon: "🔍" },
  { label: "Electronics", icon: "📱" },
  { label: "Bags", icon: "🎒" },
  { label: "Wallets", icon: "👛" },
  { label: "Keys", icon: "🔑" },
  { label: "Accessories", icon: "👓" },
];

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { items, loading } = useItems();

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory || item.category?.toLowerCase() === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      item.title?.toLowerCase().includes(searchLower) || 
      item.description?.toLowerCase().includes(searchLower) || 
      item.location?.toLowerCase().includes(searchLower);
      
    return matchesCategory && matchesSearch;
  });

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
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 md:p-12 mb-8">
          {/* Aurora Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-[100px] opacity-50 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-foreground">
              <span>✨</span> AI-matched recoveries · Real-time campus feed
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Lost something?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Let's bring it home.
              </span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-xl">
              Beacon helps students report, discover, and recover lost items across campus with real-time alerts and AI matching.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={() => navigate("/post")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                Post a found item
              </button>
              <button 
                onClick={() => {
                  searchInputRef.current?.focus();
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-xl bg-secondary/50 border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                Browse feed
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-muted-foreground">Active reports</div>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">{items.length}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-status-lost/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-muted-foreground">Lost</div>
              <PackageSearch className="w-4 h-4 text-status-lost" />
            </div>
            <div className="text-3xl font-bold text-foreground">{items.filter(i => i.type === 'lost').length}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-status-found/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-muted-foreground">Found</div>
              <CheckCircle2 className="w-4 h-4 text-status-found" />
            </div>
            <div className="text-3xl font-bold text-foreground">{items.filter(i => i.type === 'found').length}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              ref={searchInputRef}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location, or keyword..." 
              className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1 shadow-sm">
            {['All', 'Lost', 'Found'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedCategory(filter === 'All' ? 'All' : filter.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  (selectedCategory === 'All' && filter === 'All') || (selectedCategory.toLowerCase() === filter.toLowerCase() && filter !== 'All')
                    ? "bg-secondary text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Recent Items
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[3/4] bg-secondary animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ItemCard 
                  key={item.id}
                  {...item} 
                  id={item.id as string}
                  status={item.type as 'lost'|'found'} 
                  timeAgo={formatTimeAgo(item.createdAt)}
                  verified={false} 
                />
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-xl">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar (Activity) */}
      <div className="w-full xl:w-80 space-y-6 hidden xl:block">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
          <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Sarah M.</span> found a <span className="font-medium text-primary cursor-pointer hover:underline">MacBook Pro</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{i * 12} mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
