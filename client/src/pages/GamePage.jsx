import { useRef, useCallback, useState } from 'react';
import { useGame } from '../context/GameContext';
import DrawingCanvas from '../components/DrawingCanvas';
import ToolBar from '../components/ToolBar';
import Timer from '../components/Timer';
import ReferenceImage from '../components/ReferenceImage';

export default function GamePage() {
  const {
    currentRound,
    totalRounds,
    referenceImage,
    duration,
    submitCanvas,
    canvasSubmitted,
  } = useGame();

  const canvasRef = useRef(null);

  // Toolbar state lifted up so ToolBar can be a controlled component
  const [tool, setTool] = useState('brush');
  const [color, setColor] = useState('#F5A623');
  const [brushSize, setBrushSize] = useState(8);

  // Sync state down to canvas imperatively
  const handleSetTool = (t) => {
    setTool(t);
    canvasRef.current?.setTool(t);
  };
  const handleSetColor = (c) => {
    setColor(c);
    canvasRef.current?.setColor(c);
  };
  const handleSetBrushSize = (s) => {
    setBrushSize(s);
    canvasRef.current?.setBrushSize(s);
  };
  const handleUndo = () => canvasRef.current?.undo();
  const handleClear = () => canvasRef.current?.clearCanvas();

  const handleTimeEnd = useCallback(() => {
    if (canvasSubmitted) return;
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.exportImage();
      submitCanvas(dataUrl);
    }
  }, [submitCanvas, canvasSubmitted]);

  const handleSubmitEarly = useCallback(() => {
    if (canvasSubmitted) return;
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.exportImage();
      submitCanvas(dataUrl);
    }
  }, [submitCanvas, canvasSubmitted]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 relative">
      {/* Top Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 animate-slide-down">
        <div className="flex items-center gap-4">
          <span className="badge-gold">
            Round {currentRound} / {totalRounds}
          </span>
          <h2 className="font-display text-lg font-semibold text-onam-cream">
            🎨 Draw the Pookalam!
          </h2>
        </div>
        <Timer duration={duration} onEnd={handleTimeEnd} size="normal" />
      </div>

      {/* Main content */}
      <div className="flex-1 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Reference Image */}
        <div className="animate-slide-up flex-shrink-0">
          <ReferenceImage imageName={referenceImage} label="Reference" size="normal" />
        </div>

        {/* Drawing Area */}
        <div className="flex flex-col items-center gap-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <DrawingCanvas
            ref={canvasRef}
            size={420}
            disabled={canvasSubmitted}
          />

          {!canvasSubmitted ? (
            <>
              <ToolBar
                activeTool={tool}
                activeColor={color}
                activeBrushSize={brushSize}
                onSetTool={handleSetTool}
                onSetColor={handleSetColor}
                onSetBrushSize={handleSetBrushSize}
                onUndo={handleUndo}
                onClear={handleClear}
                disabled={canvasSubmitted}
              />
              <button onClick={handleSubmitEarly} className="btn-primary mt-2">
                ✅ Submit Early
              </button>
            </>
          ) : (
            <div className="glass-card px-6 py-4 text-center animate-scale-in">
              <p className="text-onam-green font-display font-semibold text-lg">
                ✅ Submitted!
              </p>
              <p className="text-onam-cream/50 text-sm font-body mt-1">
                Waiting for other players...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
