import { ChevronsLeft } from "lucide-react";

interface ToolSidebarCloseProps {
  onClick: () => void;
}

const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
  return (
    <button
      className="absolute right-0 top-[50%] transform -translate-y-1/2 translate-x-full w-10 h-[70px] bg-white flex items-center justify-center rounded-r-xl border-y border-r group"
      onClick={onClick}
    >
      <ChevronsLeft className="size-4 text-black group-hover:opacity-75 transition" />
    </button>
  );
};

export default ToolSidebarClose;
