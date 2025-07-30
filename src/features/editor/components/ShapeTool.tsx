import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface ShapeToolProps {
  icon: LucideIcon | IconType;
  onClick: () => void;
  iconClassName?: string;
}

const ShapeTool = ({ icon: Icon, onClick, iconClassName }: ShapeToolProps) => {
  return (
    <button className="aspect-square border rounded-b-md p-5" onClick={onClick}>
      <Icon className={cn("w-full h-full", iconClassName)} />
    </button>
  );
};

export default ShapeTool;
