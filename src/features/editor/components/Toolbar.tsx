"use client";

import { ActiveTool, Editor } from "../types";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const selectedObject = editor?.canvas.getActiveObject();
  const getProperty = (property: any) => {
    if (!selectedObject) return null;

    return selectedObject.get(property);
  };

  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex justify-center items-center h-full">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-gray-100 ")}
            onClick={() => {
              onChangeActiveTool("fill");
            }}
          >
            <div
              className="rounded-sm size-4 border "
              style={{
                backgroundColor: fillColor || "#000000",
              }}
            />
          </Button>
        </Hint>
      </div>
      <div className="flex justify-center items-center h-full">
        <Hint label="Stroke Color" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === "stroke-color" && "bg-gray-100 ")}
            onClick={() => {
              onChangeActiveTool("stroke-color");
            }}
          >
            <div
              className="rounded-sm size-4 border border-2 bg-white"
              style={{
                borderColor: strokeColor || "#000000",
              }}
            />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
