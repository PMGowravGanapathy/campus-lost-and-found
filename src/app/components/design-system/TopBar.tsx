import { Link } from "react-router";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "./Button";

export const TopBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <Link to="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground hidden sm:block">Beacon</span>
        </Link>
        
        <div className="hidden md:flex items-center relative w-96">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
          <input 
            type="text" 
            placeholder="Search items, categories..." 
            className="w-full bg-secondary/50 border border-border rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-lost rounded-full ring-2 ring-background"></span>
        </button>
        <Link to="/post">
          <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent border-0 hover:opacity-90">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Post Item</span>
          </Button>
        </Link>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xs ml-2 cursor-pointer border border-border">
          JD
        </div>
      </div>
    </header>
  );
};
