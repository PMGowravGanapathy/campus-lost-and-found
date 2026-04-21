import { Link, useLocation } from "react-router";
import { Home, PackageSearch, MessageSquare, User, Settings } from "lucide-react";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const workspaceItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "My Items", path: "/profile", icon: PackageSearch },
    { name: "Messages", path: "/chat/1", icon: MessageSquare },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const manageItems = [
    { name: "Admin", path: "/admin", icon: Settings },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-64px)] fixed left-0 top-16 bg-background border-r border-border hidden lg:flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Workspace
          </div>
          <div className="space-y-1">
            {workspaceItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Manage
          </div>
          <div className="space-y-1">
            {manageItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
};
