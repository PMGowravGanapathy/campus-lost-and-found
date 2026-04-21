import { motion } from "motion/react";

export interface StatusChipProps {
  status: "lost" | "found" | "claimed";
  size?: "sm" | "md";
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, size = "md" }) => {
  const statusConfig = {
    lost: {
      bg: "bg-status-lost/90",
      text: "Lost",
      icon: "🔍",
    },
    found: {
      bg: "bg-status-found/90",
      text: "Found",
      icon: "✓",
    },
    claimed: {
      bg: "bg-status-claimed/90",
      text: "Claimed",
      icon: "🎉",
    },
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
  };

  const config = statusConfig[status];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${config.bg} ${sizeStyles[size]} backdrop-blur-sm text-white font-semibold rounded-lg inline-flex items-center gap-1.5`}
    >
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </motion.div>
  );
};
