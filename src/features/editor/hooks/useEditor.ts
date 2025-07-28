import { useCallback } from "react";
import { fabric } from "fabric";

const useEditor = () => {
  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement | null;
    }) => {},
    []
  );

  return {
    init,
  };
};

export default useEditor;
