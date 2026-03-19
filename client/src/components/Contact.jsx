import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';

const SOCIALS = [
  { label: 'GitHub',   handle: 'https://github.com/NikitaMandle',           href: 'https://github.com/NikitaMandle',           color: '#00e5a0', icon: 'GH' },
  { label: 'LinkedIn', handle: 'https://www.linkedin.com/in/nikita-mandle', href: 'https://www.linkedin.com/in/nikita-mandle', color: '#7c6fff', icon: 'LI' },
  // { label: 'LeetCode', handle: 'nikitamandle',            href: '#', color: '#ffd93d', icon: 'LC' },
];

const INFO = [
  { label: 'Email',    value: 'nikitamandle21@gmail.com',    color: '#00e5a0' },
  { label: 'Location', value: 'Nagpur, Maharashtra', color: '#7c6fff' },
  { label: 'Status',   value: 'Open to work ',     color: '#00e5a0' },
];

function Input({ label, name, value, onChange, error, type = 'text' }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
        color: focused ? 'var(--accent)' : 'var(--muted)',
        transition: 'color 0.3s',
      }}>
        {label} {label !== 'Subject' && <span style={{ color: 'var(--accent3)' }}>*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${error ? '#ff6b6b60' : focused ? 'rgba(0,229,160,0.5)' : 'rgba(255,255,255,0.07)'}`,
          color: 'var(--text)',
          fontFamily: "'Space Mono', monospace", fontSize: '13px',
          padding: '12px 16px', outline: 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxShadow: focused ? '0 0 0 3px rgba(0,229,160,0.06)' : 'none',
        }}
      />
      {error && (
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px', color: 'var(--accent3)', letterSpacing: '1px',
        }}>⚠ {error}</span>
      )}
    </div>
  );
}

function Textarea({ label, name, value, onChange, error, maxLen = 500 }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
          color: focused ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.3s',
        }}>
          Message <span style={{ color: 'var(--accent3)' }}>*</span>
        </label>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '10px',
          color: value.length > maxLen * 0.8 ? 'var(--accent3)' : 'var(--muted)',
        }}>{value.length}/{maxLen}</span>
      </div>
      <textarea
        name={name} value={value} rows={5} maxLength={maxLen}
        onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder="Tell me about your project, role, or idea..."
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${error ? '#ff6b6b60' : focused ? 'rgba(0,229,160,0.5)' : 'rgba(255,255,255,0.07)'}`,
          color: 'var(--text)', resize: 'none',
          fontFamily: "'Space Mono', monospace", fontSize: '13px',
          padding: '14px 16px', outline: 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxShadow: focused ? '0 0 0 3px rgba(0,229,160,0.06)' : 'none',
          lineHeight: 1.7,
        }}
      />
      {error && (
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px', color: 'var(--accent3)', letterSpacing: '1px',
        }}>⚠ {error}</span>
      )}
    </div>
  );
}

export default function Contact({ addToast }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Name must be at least 2 characters';
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = 'Enter a valid email address';
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters';
    return e;
  };

  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      addToast(res.data.message || 'Message sent! 🎉', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      addToast(err.response?.data?.message || 'Something went wrong.', 'error');
    } finally { setLoading(false); }
  };

  return (
    <section id="contact" style={{ background: 'var(--bg2)', position: 'relative', zIndex: 1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          {/* <span className="sn">04 /</span> */}
          <h2 className="st">Contact</h2>
          <div className="sl" />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: '48px', alignItems: 'start',
        }}>

          {/* ── LEFT PANEL ── */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
          }}>
            {/* Heading */}
            <h3 style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800, lineHeight: 1.1, marginBottom: '16px',
            }}>
              Got an idea?<br />
              <span style={{ color: 'var(--accent)' }}>Let's ship it.</span>
            </h3>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px', color: 'var(--muted)',
              lineHeight: 1.9, marginBottom: '36px',
            }}>
              Open to full-time roles, freelance projects,<br />
              and collaborations. Usually reply within 24h.
            </p>

            {/* Info rows */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0',
              marginBottom: '36px',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              {INFO.map((item, i) => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '14px 18px',
                  borderBottom: i < INFO.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '10px', color: 'var(--muted)',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    minWidth: '64px',
                  }}>{item.label}</span>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px', color: item.color,
                  }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Social grid */}
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', color: 'var(--accent)',
              letterSpacing: '3px', textTransform: 'uppercase',
              marginBottom: '16px',
            }}>Socials</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 14px',
                    background: 'var(--bg3)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    textDecoration: 'none', transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = s.color + '50';
                    e.currentTarget.style.background = s.color + '08';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = 'var(--bg3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '30px', height: '30px',
                    background: s.color + '18',
                    border: `1px solid ${s.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px', color: s.color, fontWeight: 700,
                    flexShrink: 0,
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: s.color }}>{s.label}</div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '9px', color: 'var(--muted)',
                      letterSpacing: '0.5px', marginTop: '2px',
                    }}>{s.handle}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: s.color, fontSize: '14px', opacity: 0.7 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL: Terminal-style form ── */}
          <div style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.15s',
          }}>
            {/* Terminal header */}
            <div style={{
              background: 'var(--bg4)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderBottom: 'none',
              padding: '12px 18px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              {['#ff6b6b', '#ffd93d', '#6bcb77'].map((c, i) => (
                <div key={i} style={{
                  width: '10px', height: '10px',
                  borderRadius: '50%', background: c, opacity: 0.8,
                }} />
              ))}
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px', color: 'var(--muted)', marginLeft: '8px',
              }}>
                new_message.js
              </span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <span style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: 'var(--accent)', display: 'inline-block',
                  animation: 'glow 1.5s infinite',
                }} />
                POST /api/contact
              </span>
            </div>

            {/* Form body */}
            <form onSubmit={onSubmit} style={{
              background: 'var(--bg3)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '32px',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input label="Name"  name="name"  value={form.name}  onChange={onChange} error={errors.name} />
                <Input label="Email" name="email" value={form.email} onChange={onChange} error={errors.email} type="email" />
              </div>

              <Input label="Subject" name="subject" value={form.subject} onChange={onChange} />

              <Textarea name="message" value={form.message} onChange={onChange} error={errors.message} />

              {/* Submit */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px',
                }}>
                </span>
                <button
                  type="submit"
                  className="btn btn-p"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width: '12px', height: '12px',
                        border: '2px solid #07070e',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spinSlow 0.7s linear infinite',
                        display: 'inline-block',
                      }} />
                      Sending...
                    </>
                  ) : 'Send Message →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
