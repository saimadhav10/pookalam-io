import { DRAWING_COLORS, BRUSH_SIZES } from '../utils/constants';

export default function ToolBar({ activeTool, activeColor, activeBrushSize, onSetTool, onSetColor, onSetBrushSize, onUndo, onClear, disabled = false }) {
  return (
    <div
      className={`terra-card px-5 py-4 flex flex-wrap items-center gap-4 transition-opacity ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {/* Tools */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSetTool('brush')}
          className={`tool-button-terra ${activeTool === 'brush' ? 'tool-button-terra-active' : ''}`}
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
          className={`tool-button-terra ${activeTool === 'eraser' ? 'tool-button-terra-active' : ''}`}
          title="Eraser"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 20H7L3 16c-.8-.8-.8-2 0-2.8L14.8 1.4c.8-.8 2-.8 2.8 0l5 5c.8.8.8 2 0 2.8L12 20" />
            <path d="M6 11l4 4" />
          </svg>
        </button>

        <div className="w-px h-8 bg-outline-variant/30 mx-1" />

        <button onClick={onUndo} className="tool-button-terra" title="Undo (Ctrl+Z)">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
          </svg>
        </button>
        <button onClick={onClear} className="tool-button-terra" title="Clear Canvas">
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
            className={`tool-button-terra min-w-[36px] text-xs font-headline font-bold ${
              activeBrushSize === s.value ? 'tool-button-terra-active' : ''
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="w-px h-8 bg-outline-variant/30" />

      {/* Color Palette */}
      <div className="flex flex-wrap items-center gap-2">
        {DRAWING_COLORS.map((c) => (
          <div key={c.hex} className="flex flex-col items-center gap-1">
            <button
              onClick={() => {
                onSetColor(c.hex);
                onSetTool('brush');
              }}
              className={`color-swatch-terra ${activeColor === c.hex && activeTool === 'brush' ? 'color-swatch-terra-active' : ''}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
            <span className="text-[10px] text-on-surface-variant font-body">{c.name}</span>
          </div>
        ))}

        {/* Custom color picker */}
        <div className="flex flex-col items-center gap-1">
          <label className="color-swatch-terra flex items-center justify-center bg-gradient-to-br from-red-500 via-green-500 to-blue-500 cursor-pointer" title="Custom Color">
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
          <span className="text-[10px] text-on-surface-variant font-body">Custom</span>
        </div>
      </div>
    </div>
  );
}
