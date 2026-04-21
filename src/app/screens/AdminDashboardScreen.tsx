import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, ShieldCheck, AlertTriangle, MoreVertical, CheckCircle2, XCircle, FileText } from "lucide-react";
import { Button } from "../components/design-system/Button";
import { Input } from "../components/design-system/Input";

const mockReports = [
  { id: "REP-001", type: "Fraudulent Claim", user: "John Doe", item: "iPhone 13 Pro", status: "pending", date: "2h ago" },
  { id: "REP-002", type: "Inappropriate Content", user: "Jane Smith", item: "Water Bottle", status: "resolved", date: "1d ago" },
  { id: "REP-003", type: "Spam Posting", user: "Mike Johnson", item: "Wallet", status: "pending", date: "2d ago" },
];

const mockStats = [
  { label: "Total Users", value: "2,451", trend: "+12%" },
  { label: "Active Items", value: "342", trend: "+5%" },
  { label: "Successful Matches", value: "891", trend: "+18%" },
  { label: "Pending Reports", value: "14", trend: "-2%" },
];

export const AdminDashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "users">("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage platform activity and user reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border">
        {["overview", "reports", "users"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockStats.map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                  <span className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-status-found' : 'text-status-lost'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border bg-secondary/30">
                <h3 className="font-semibold text-foreground">Recent Alerts</h3>
              </div>
              <div className="p-0">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div className="mt-0.5">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Suspicious Activity Detected</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Multiple rapid claims from user ID #4921</p>
                      <p className="text-[10px] text-muted-foreground mt-2">10 mins ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-foreground mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database Sync</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-status-found"></span>
                    <span className="text-xs font-medium text-foreground">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Image Processing</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-status-found"></span>
                    <span className="text-xs font-medium text-foreground">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Push Notifications</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-medium text-foreground">Degraded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-secondary/30">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="w-full bg-input-background border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Report ID</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Target</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockReports.map((report) => (
                  <tr key={report.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{report.id}</td>
                    <td className="px-6 py-4">{report.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-foreground">{report.user}</span>
                        <span className="text-xs text-muted-foreground">{report.item}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        report.status === 'resolved' 
                          ? 'bg-status-found/10 text-status-found border border-status-found/20' 
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{report.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {report.status === 'pending' && (
                          <>
                            <button className="p-1.5 text-status-found hover:bg-status-found/10 rounded-md transition-colors" title="Resolve">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-status-lost hover:bg-status-lost/10 rounded-md transition-colors" title="Dismiss">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
