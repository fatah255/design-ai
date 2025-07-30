import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR, STROKE_COLOR } from "../types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./ShapeTool";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { ColorPicker } from "./ColorPicker";

interface StrokeColorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor?: Editor | undefined;
}
const StrokeColorSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: StrokeColorSidebarProps) => {
  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Color"
        description="Change the stroke color of selected shapes"
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

export default StrokeColorSidebar;
