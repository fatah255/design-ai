"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/Hint";
import { BsCloudCheck } from "react-icons/bs";
import { ActiveTool } from "../types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({ activeTool, onChangeActiveTool }: NavbarProps) => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:p-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full ">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem className="flex items-center gap-x-2">
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            onClick={() => {
              onChangeActiveTool("select");
            }}
            variant="ghost"
            size="icon"
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>

        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <Undo2 className="size-4" />
          </Button>
        </Hint>

        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Saved</div>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiFileOn className="size-8" />
                <div>JSON</div>
                <div className="text-xs text-muted-foreground">
                  Save for later editing
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiFileOn className="size-8" />
                <div>PNG</div>
                <div className="text-xs text-muted-foreground">
                  Show your design to the world
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiFileOn className="size-8" />
                <div>JPG</div>
                <div className="text-xs text-muted-foreground">
                  Print your design to the real world
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <CiFileOn className="size-8" />
                <div>SVG</div>
                <div className="text-xs text-muted-foreground">
                  Use your design in other tools
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
