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

  const [tool, setTool] = useState('brush');
  const [color, setColor] = useState('#F5A623');
  const [brushSize, setBrushSize] = useState(8);

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
    <div className="min-h-screen bg-[#faf6f0] flex flex-col items-center px-4 py-6 relative">
      {/* Top Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 animate-slide-down">
        <div className="flex items-center gap-4">
          <span className="badge-terra-green bg-[#4a7c59]/10 text-[#4a7c59] px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            Round {currentRound} / {totalRounds}
          </span>
          <h2 className="font-headline text-2xl font-bold text-[#2e3230] flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4a7c59]">
              <circle cx="13.5" cy="10.5" r="1.5"></circle>
              <circle cx="8.5" cy="10.5" r="1.5"></circle>
              <circle cx="11" cy="7.5" r="1.5"></circle>
              <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22a4.2 4.2 0 0 0 4-4v-1.5a2.5 2.5 0 0 1 5 0V12c0-5.5-4.5-10-9-10Z"></path>
            </svg>
            Draw the Pookalam!
          </h2>
        </div>
        <Timer duration={duration} onEnd={handleTimeEnd} size="normal" />
      </div>

      {/* Main content */}
      <div className="flex-1 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Reference Image */}
        <div className="animate-slide-up flex-shrink-0 bg-white rounded-2xl p-4 border border-[#4a4e4a]/10 shadow-terra-card">
          <ReferenceImage imageName={referenceImage} label="Reference Goal" size="normal" />
        </div>

        {/* Drawing Area */}
        <div className="flex flex-col items-center gap-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="canvas-container-terra bg-white rounded-2xl overflow-hidden border border-[#4a4e4a]/10 shadow-terra-card p-2">
            <DrawingCanvas
              ref={canvasRef}
              size={420}
              disabled={canvasSubmitted}
            />
          </div>

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
              <button 
                onClick={handleSubmitEarly} 
                className="btn-terra-primary bg-[#4a7c59] text-white font-bold px-6 py-3 rounded-xl shadow-[0_4px_0_#2e4d37] active:shadow-[0_0px_0_#2e4d37] active:translate-y-1 transition-all mt-2 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Submit Early
              </button>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-[#4a4e4a]/10 shadow-terra-card px-8 py-6 text-center animate-scale-in">
              <div className="flex justify-center mb-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4a7c59]">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <p className="text-[#4a7c59] font-headline font-bold text-xl mb-1">
                Submitted!
              </p>
              <p className="text-[#4a4e4a] text-sm font-body">
                Waiting for other players...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
