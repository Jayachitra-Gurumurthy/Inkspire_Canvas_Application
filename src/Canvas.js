import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";



const Canvas = forwardRef(({ tool , brushColor  }, ref) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [savedImage, setSavedImage] = useState(null);
  
 useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.lineCap = "round";
    context.strokeStyle = brushColor; // ✅ dynamic color
    context.lineWidth = 3;
    setCtx(context);
  }, [brushColor]);


  const startDrawing = (e) => {
    if (!ctx) return;
    setIsDrawing(true);
    setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

    if (tool === "brush") {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    } else {
      // Save current canvas state for preview
      setSavedImage(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    }
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "brush") {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    } else {
      // Restore saved image before drawing preview
      ctx.putImageData(savedImage, 0, 0);

      const width = offsetX - startPos.x;
      const height = offsetY - startPos.y;

      if (tool === "square") {
        const size = Math.max(Math.abs(width), Math.abs(height));
        ctx.strokeRect(startPos.x, startPos.y, size * Math.sign(width), size * Math.sign(height));
      } else if (tool === "rectangle") {
        ctx.strokeRect(startPos.x, startPos.y, width, height);
      } else if (tool === "circle") {
        const radius = Math.sqrt(width * width + height * height);
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (tool === "line") {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setStartPos(null);
    ctx?.closePath();
  };

  const clearCanvas = () => {
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useImperativeHandle(ref, () => ({
    clearCanvas,
  }));

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "2px solid #6a1b9a", background: "#121212" }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
});

export default Canvas;
