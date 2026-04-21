import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, LogOut, PackageSearch, CheckCircle2, ChevronRight, User, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { signOutUser } from "../../services/authService";
import { useItems } from "../../hooks/useItems";
import { ItemCard } from "../components/design-system/ItemCard";
import { toast } from "sonner";

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items } = useItems();
  const [activeTab, setActiveTab] = useState<"posted" | "claimed">("posted");

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const userItems = items.filter(i => i.userId === user?.uid);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 relative"
    >
      {/* Background Aurora */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-primary/20 via-accent/10 to-status-claimed/20 rounded-full blur-[120px] opacity-40 pointer-events-none -z-10" />

      {/* Profile Header & Stats Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Info Card */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-card/60 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center lg:col-span-1 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-card to-secondary flex items-center justify-center text-foreground font-bold text-4xl shadow-xl relative z-10 border border-white/10">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">{user?.displayName || "John Doe"}</h2>
          <p className="text-sm text-muted-foreground mb-6 font-medium">{user?.email || "student@university.edu"}</p>
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-status-found/20 to-status-found/5 text-status-found px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-8 border border-status-found/20 shadow-inner">
            <ShieldCheck className="w-4 h-4" />
            Verified Student
          </div>

          <div className="w-full space-y-3 mt-auto">
            <button 
              onClick={() => toast("Account settings coming soon!", { icon: "⚙️" })}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 text-sm font-semibold text-foreground transition-all duration-300 border border-transparent hover:border-white/10 hover:shadow-md group/btn"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary group-hover/btn:bg-background transition-colors">
                  <Settings className="w-4 h-4 text-muted-foreground group-hover/btn:text-foreground transition-colors" />
                </div>
                Account Settings
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-destructive/10 hover:text-destructive text-sm font-semibold text-muted-foreground transition-all duration-300 border border-transparent hover:border-destructive/20 hover:shadow-md group/btn"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary group-hover/btn:bg-destructive/20 transition-colors">
                  <LogOut className="w-4 h-4 group-hover/btn:text-destructive transition-colors" />
                </div>
                Sign Out
              </div>
            </button>
          </div>
        </motion.div>

        {/* Stats & Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 tracking-tight">
              My Activity
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-500" />
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                  <PackageSearch className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-5xl font-black text-foreground tracking-tighter mb-1">{userItems.length}</p>
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Items Posted</span>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-status-claimed/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-status-claimed/20 transition-colors duration-500" />
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-status-claimed/20 flex items-center justify-center text-status-claimed border border-status-claimed/20 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-5xl font-black text-foreground tracking-tighter mb-1">0</p>
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Items Claimed</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="bg-card/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden relative">
            <div className="flex border-b border-white/10 relative p-2 gap-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
              <button
                className={`flex-1 py-4 text-sm font-bold transition-all rounded-2xl relative z-10 ${
                  activeTab === "posted"
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                onClick={() => setActiveTab("posted")}
              >
                Posted Items
                <span className="ml-2 bg-background/50 px-2 py-0.5 rounded-full text-xs border border-white/5">{userItems.length}</span>
              </button>
              <button
                className={`flex-1 py-4 text-sm font-bold transition-all rounded-2xl relative z-10 ${
                  activeTab === "claimed"
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                onClick={() => setActiveTab("claimed")}
              >
                Claimed Items
                <span className="ml-2 bg-background/50 px-2 py-0.5 rounded-full text-xs border border-white/5">0</span>
              </button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === "posted" ? (
                  <motion.div 
                    key="posted"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {userItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userItems.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <ItemCard 
                              {...item} 
                              id={item.id as string}
                              status={item.type as 'lost'|'found'} 
                              timeAgo="2d ago"
                              verified={true} 
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-inner border border-white/5">
                          <PackageSearch className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">No items posted</h3>
                        <p className="text-sm text-muted-foreground max-w-sm">You haven't reported any lost or found items yet. Once you do, they'll appear here.</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="claimed"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center py-16 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-inner border border-white/5">
                        <CheckCircle2 className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">No claimed items</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">Items that you have successfully claimed or returned will show up in this history log.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
