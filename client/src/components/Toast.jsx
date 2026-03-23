export default function Toast({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{ position:'fixed', bottom:'32px', right:'32px', zIndex:1000, display:'flex', flexDirection:'column', gap:'10px' }}
    >
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: '14px 20px', minWidth: '280px',
          fontFamily: "'Space Mono',monospace", fontSize: '12px', letterSpacing: '1px',
          display: 'flex', alignItems: 'center', gap: '12px',
          borderLeft: `3px solid ${t.type === 'success' ? 'var(--accent)' : 'var(--accent3)'}`,
          background: t.type === 'success' ? 'rgba(0,229,160,0.07)' : 'rgba(255,107,107,0.07)',
          color: t.type === 'success' ? 'var(--accent)' : 'var(--accent3)',
          backdropFilter: 'blur(20px)',
          animation: 'slideIn 0.4s ease',
        }}>
          <span style={{ fontSize:'16px' }}>{t.type === 'success' ? '✓' : '✗'}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
