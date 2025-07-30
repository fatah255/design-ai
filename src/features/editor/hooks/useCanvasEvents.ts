import { fabric } from "fabric";
import { useEffect } from "react";

interface useCanvasEventsProps {
  canvas: fabric.Canvas | null;
  clearSelectionCallback?: () => void;
  setSelectedObjects: React.Dispatch<React.SetStateAction<fabric.Object[]>>;
}

const useCanvasEvents = ({
  canvas,
  clearSelectionCallback,
  setSelectedObjects,
}: useCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback]);
};

export default useCanvasEvents;
