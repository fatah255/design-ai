import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import useAutoResize from "./useAutoResize";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
} from "../types";
import useCanvasEvents from "./useCanvasEvents";
import { isTextType } from "../utils";

const buildEditor = ({
  canvas,
  setFillColor,
  setStrokeWidth,
  setStrokeColor,
  fillColor,
  strokeColor,
  strokeWidth,
  selectedObjects,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((obj) => obj.name === "clip");
  };
  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    if (!object) return;

    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set("fill", value);
        canvas.requestRenderAll();
      });
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          obj.set({ fill: value });
        } else {
          obj.set({ stroke: value });
        }
        canvas.requestRenderAll();
      });
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeWidth: value });
        canvas.requestRenderAll();
      });
    },
    addCircle: () => {
      const circle = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(circle);
    },
    addSoftRectangle: () => {
      const rect = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(rect);
    },
    addRectangle: () => {
      const rect = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(rect);
    },
    addTriangle: () => {
      const rect = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(rect);
    },
    addInverseTriangle: () => {
      const WIDTH = 400;
      const HEIGHT = 400;
      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }
      );
      addToCanvas(object);
    },
    addDiamond: () => {
      const WIDTH = 400;
      const HEIGHT = 400;
      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }
      );
      addToCanvas(object);
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fillColor;
      const value = selectedObject.get("fill") || fillColor;
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeColor;
      const value = selectedObject.get("stroke") || strokeColor;
      return value;
    },
    canvas,
    selectedObjects,
  };
};

const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

  useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({
    canvas,
    clearSelectionCallback,
    setSelectedObjects,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        selectedObjects,
      });
    }

    return undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement | null;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0, 0, 0, 0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setHeight(String(initialContainer?.offsetHeight));
      initialCanvas.setWidth(String(initialContainer?.offsetWidth));

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);

      initialCanvas.clipPath = initialWorkspace;

      const test = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "black",
      });

      initialCanvas.add(test);
      initialCanvas.centerObject(test);

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    []
  );

  return {
    init,
    editor,
  };
};

export default useEditor;
