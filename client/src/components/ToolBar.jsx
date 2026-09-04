import { DRAWING_COLORS, BRUSH_SIZES } from '../utils/constants';

export default function ToolBar({ activeTool, activeColor, activeBrushSize, onSetTool, onSetColor, onSetBrushSize, onUndo, onClear, disabled = false }) {
  return (
    <div
      className={`glass-card px-5 py-4 flex flex-wrap items-center gap-4 transition-opacity ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {/* Tools */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSetTool('brush')}
          className={`tool-button ${activeTool === 'brush' ? 'tool-button-active' : ''}`}
          title="Brush"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
        </button>
        <button
          onClick={() => onSetTool('eraser')}
          className={`tool-button ${activeTool === 'eraser' ? 'tool-button-active' : ''}`}
          title="Eraser"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 20H7L3 16c-.8-.8-.8-2 0-2.8L14.8 1.4c.8-.8 2-.8 2.8 0l5 5c.8.8.8 2 0 2.8L12 20" />
            <path d="M6 11l4 4" />
          </svg>
        </button>

        <div className="w-px h-8 bg-white/10 mx-1" />

        <button onClick={onUndo} className="tool-button" title="Undo (Ctrl+Z)">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
          </svg>
        </button>
        <button onClick={onClear} className="tool-button" title="Clear Canvas">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>

      {/* Brush Size */}
      <div className="flex items-center gap-1.5">
        {BRUSH_SIZES.map((s) => (
          <button
            key={s.value}
            onClick={() => onSetBrushSize(s.value)}
            className={`tool-button min-w-[36px] text-xs font-display font-bold ${
              activeBrushSize === s.value ? 'tool-button-active' : ''
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="w-px h-8 bg-white/10" />

      {/* Color Palette */}
      <div className="flex flex-wrap items-center gap-1.5">
        {DRAWING_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => {
              onSetColor(c);
              onSetTool('brush');
            }}
            className={`color-swatch ${activeColor === c && activeTool === 'brush' ? 'color-swatch-active' : ''}`}
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}

        {/* Custom color picker */}
        <label className="color-swatch flex items-center justify-center bg-gradient-to-br from-red-500 via-green-500 to-blue-500 cursor-pointer" title="Custom Color">
          <input
            type="color"
            value={activeColor}
            onChange={(e) => {
              onSetColor(e.target.value);
              onSetTool('brush');
            }}
            className="sr-only"
          />
          <span className="text-[10px] font-bold text-white drop-shadow-md">+</span>
        </label>
      </div>
    </div>
  );
}
