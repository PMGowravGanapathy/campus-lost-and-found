import { motion } from "motion/react";
import { MapPin, Clock } from "lucide-react";
import { StatusChip } from "./StatusChip";
import { useNavigate } from "react-router";

export interface ItemCardProps {
  id: string;
  title: string;
  category: string;
  status: "lost" | "found";
  location: string;
  timeAgo: string;
  imageUrl: string;
  verified?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  category,
  status,
  location,
  timeAgo,
  imageUrl,
  verified,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/item/${id}`)}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {verified && (
          <div className="absolute top-3 right-3 bg-status-found text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </div>
        )}
        <div className="absolute top-3 left-3">
          <StatusChip status={status} />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">{category}</p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-muted-foreground mt-auto border-t border-border/50 pt-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
