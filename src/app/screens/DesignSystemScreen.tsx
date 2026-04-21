import { motion } from "motion/react";
import { ArrowLeft, Palette, Type, Grid3x3, Component, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/design-system/Button";
import { Input } from "../components/design-system/Input";
import { CategoryChip } from "../components/design-system/CategoryChip";
import { StatusChip } from "../components/design-system/StatusChip";
import { ItemCard } from "../components/design-system/ItemCard";

const colors = [
  { name: "Primary", value: "#4F46E5", var: "--primary" },
  { name: "Background", value: "#0F172A", var: "--background" },
  { name: "Foreground", value: "#F1F5F9", var: "--foreground" },
  { name: "Status Lost", value: "#EF4444", var: "--status-lost" },
  { name: "Status Found", value: "#10B981", var: "--status-found" },
  { name: "Status Claimed", value: "#8B5CF6", var: "--status-claimed" },
];

const spacing = [
  { name: "4px", value: "4px", var: "--spacing-4" },
  { name: "8px", value: "8px", var: "--spacing-8" },
  { name: "16px", value: "16px", var: "--spacing-16" },
  { name: "24px", value: "24px", var: "--spacing-24" },
  { name: "32px", value: "32px", var: "--spacing-32" },
  { name: "40px", value: "40px", var: "--spacing-40" },
  { name: "48px", value: "48px", var: "--spacing-48" },
  { name: "64px", value: "64px", var: "--spacing-64" },
];

export const DesignSystemScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/admin")}
              className="p-3 rounded-xl bg-card border border-border"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Design System</h1>
              <p className="text-muted-foreground">Campus Lost & Found UI Components & Guidelines</p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Color System</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colors.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-4"
              >
                <div
                  className="w-full h-20 rounded-xl mb-3 shadow-lg"
                  style={{ backgroundColor: color.value }}
                />
                <h3 className="text-sm font-semibold text-foreground mb-1">{color.name}</h3>
                <p className="text-xs text-muted-foreground font-mono">{color.value}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{color.var}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Type className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Typography</h2>
          </div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 space-y-6">
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">H1 - 28px Bold</p>
              <h1 className="text-foreground">The quick brown fox jumps</h1>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">H2 - 22px SemiBold</p>
              <h2 className="text-foreground">The quick brown fox jumps</h2>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">Body - 16px Regular</p>
              <p className="text-foreground">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">Caption - 14px Regular</p>
              <p className="text-sm text-muted-foreground">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </section>

        {/* Spacing System */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Grid3x3 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">8pt Grid System</h2>
          </div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8">
            <div className="space-y-4">
              {spacing.map((space, index) => (
                <motion.div
                  key={space.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-24">
                    <p className="text-sm font-semibold text-foreground">{space.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{space.var}</p>
                  </div>
                  <div
                    className="h-8 bg-gradient-to-r from-primary to-status-found rounded"
                    style={{ width: space.value }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Component className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Buttons</h2>
          </div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Default</Button>
                <Button variant="primary" isLoading>Loading</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Input Fields</h2>
          </div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 space-y-6">
            <Input label="Default Input" placeholder="Enter text..." />
            <Input label="With Icon" placeholder="Search..." icon={<Grid3x3 className="w-5 h-5" />} />
            <Input label="Error State" placeholder="Enter text..." error="This field is required" />
          </div>
        </section>

        {/* Chips */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Component className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Chips & Tags</h2>
          </div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Status Chips</h3>
              <div className="flex flex-wrap gap-3">
                <StatusChip status="lost" />
                <StatusChip status="found" />
                <StatusChip status="claimed" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Category Chips</h3>
              <div className="flex flex-wrap gap-3">
                <CategoryChip label="Electronics" icon="📱" />
                <CategoryChip label="Bags" icon="🎒" selected />
                <CategoryChip label="Wallets" icon="👛" />
                <CategoryChip label="Keys" icon="🔑" />
              </div>
            </div>
          </div>
        </section>

        {/* Item Card */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Component className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Item Card</h2>
          </div>
          <div className="max-w-sm">
            <ItemCard
              id="demo"
              title="iPhone 14 Pro"
              category="Electronics"
              status="lost"
              location="Library 2nd Floor"
              timeAgo="2h ago"
              imageUrl="https://images.unsplash.com/photo-1546540120-63fa610a795b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmUlMjBsb3N0fGVufDF8fHx8MTc3NjQwOTk4OHww&ixlib=rb-4.1.0&q=80&w=1080"
              verified
            />
          </div>
        </section>

        {/* Grid Layout */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Grid3x3 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Layout Grid</h2>
          </div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8">
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">Col {i}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                4-column grid with 16px margins • Mobile: 390x844px base
              </p>
            </div>
          </div>
        </section>

        {/* Interaction Guidelines */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Micro-Interactions</h2>
          </div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Animation Timing</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Button Press:</span>
                    <span className="font-mono">0.2s</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Card Hover:</span>
                    <span className="font-mono">0.3s</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Page Transition:</span>
                    <span className="font-mono">0.4s</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Modal Open:</span>
                    <span className="font-mono">0.3s</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Easing Functions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Default:</span>
                    <span className="font-mono">ease-in-out</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Enter:</span>
                    <span className="font-mono">ease-out</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Exit:</span>
                    <span className="font-mono">ease-in</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Spring:</span>
                    <span className="font-mono">bounce: 0.4</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Shadow System */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center">
              <Component className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Elevation & Shadows</h2>
          </div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['sm', 'md', 'lg', 'xl'].map((size, index) => (
                <motion.div
                  key={size}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div
                    className="h-24 bg-gradient-to-br from-primary/20 to-status-found/20 rounded-xl flex items-center justify-center"
                    style={{ boxShadow: `var(--shadow-${size})` }}
                  >
                    <span className="text-sm font-semibold text-foreground">{size.toUpperCase()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center font-mono">
                    --shadow-{size}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            Campus Lost & Found Design System v1.0
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, Motion, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};