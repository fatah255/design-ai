import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./ShapeTool";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { ColorPicker } from "./ColorPicker";

interface FillColorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor | undefined;
}
const FillColorSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: FillColorSidebarProps) => {
  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };
  const value = editor?.getActiveFillColor() || FILL_COLOR;

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Change the fill color of selected shapes"
      />

      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose
        onClick={() => {
          onChangeActiveTool("select");
        }}
      />
    </aside>
  );
};

export default FillColorSidebar;
