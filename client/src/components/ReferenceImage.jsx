export default function ReferenceImage({ imageName, label = 'Reference', size = 'normal' }) {
  const sizeClasses = size === 'large' ? 'max-w-md' : 'max-w-xs';

  return (
    <div className={`flex flex-col items-center gap-3 ${sizeClasses}`}>
      <h3 className="font-display font-semibold text-onam-gold text-sm uppercase tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-onam-gold animate-pulse-soft" />
        {label}
      </h3>
      <div className="rounded-full overflow-hidden border-4 border-onam-gold/30 shadow-2xl shadow-onam-gold/10 animate-scale-in">
        <img
          src={`/pookalams/${imageName}`}
          alt="Reference Pookalam"
          className="w-full h-full object-cover rounded-full"
          style={size === 'large' ? { width: 400, height: 400 } : { width: 300, height: 300 }}
        />
      </div>
    </div>
  );
}
