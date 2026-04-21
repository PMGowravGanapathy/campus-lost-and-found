import { motion } from "motion/react";

export interface CategoryChipProps {
  label: string;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({ 
  label, 
  icon, 
  selected, 
  onClick 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl font-medium text-sm
        transition-all duration-200
        ${selected 
          ? "bg-primary text-primary-foreground shadow-md shadow-[var(--primary-glow)]" 
          : "bg-secondary/50 text-secondary-foreground border border-border hover:bg-secondary"
        }
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </motion.button>
  );
};
