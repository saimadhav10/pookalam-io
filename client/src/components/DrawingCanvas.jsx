import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

const DrawingCanvas = forwardRef(function DrawingCanvas(
  { size = 460, disabled = false },
  ref
) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('brush');
  const [color, setColor] = useState('#F5A623');
  const [brushSize, setBrushSize] = useState(8);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const lastPoint = useRef(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Save initial state
    saveHistory();
  }, [size]);

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL();
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(data);
      if (newHistory.length > 30) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex((prev) => {
      const newIdx = prev + 1;
      return Math.min(newIdx, 29);
    });
  }, [historyIndex]);

  const getPos = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX, clientY;
      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const isInsideCircle = useCallback(
    (x, y) => {
      const cx = size / 2;
      const cy = size / 2;
      const r = size / 2;
      return (x - cx) ** 2 + (y - cy) ** 2 <= r ** 2;
    },
    [size]
  );

  const drawLine = useCallback(
    (from, to) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.save();
      // Clip to circle
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = brushSize;

      if (tool === 'eraser') {
        ctx.strokeStyle = '#FFFFFF';
      } else {
        ctx.strokeStyle = color;
      }

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      ctx.restore();
    },
    [tool, color, brushSize, size]
  );

  const startDrawing = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      const pos = getPos(e);
      if (!isInsideCircle(pos.x, pos.y)) return;

      setIsDrawing(true);
      lastPoint.current = pos;

      // Draw a dot for single clicks
      drawLine(pos, pos);
    },
    [disabled, getPos, isInsideCircle, drawLine]
  );

  const draw = useCallback(
    (e) => {
      if (!isDrawing || disabled) return;
      e.preventDefault();
      const pos = getPos(e);

      if (lastPoint.current) {
        drawLine(lastPoint.current, pos);
      }
      lastPoint.current = pos;
    },
    [isDrawing, disabled, getPos, drawLine]
  );

  const stopDrawing = useCallback(
    (e) => {
      if (!isDrawing) return;
      if (e) e.preventDefault();
      setIsDrawing(false);
      lastPoint.current = null;
      saveHistory();
    },
    [isDrawing, saveHistory]
  );

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[newIndex];
    setHistoryIndex(newIndex);
  }, [historyIndex, history, size]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    saveHistory();
  }, [size, saveHistory]);

  const exportImage = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas.toDataURL('image/png');
  }, []);

  // Expose methods to parent
  useImperativeHandle(
    ref,
    () => ({
      undo,
      clearCanvas,
      exportImage,
      setTool,
      setColor,
      setBrushSize,
      tool,
      color,
      brushSize,
    }),
    [undo, clearCanvas, exportImage, tool, color, brushSize]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, disabled]);

  return (
    <div
      className="canvas-container inline-block"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        className={`rounded-full ${disabled ? 'opacity-70 pointer-events-none' : 'cursor-crosshair'}`}
        style={{ width: size, height: size }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
          <span className="text-onam-gold font-display font-bold text-xl animate-pulse-soft">
            Canvas Locked 🔒
          </span>
        </div>
      )}
    </div>
  );
});

export default DrawingCanvas;
