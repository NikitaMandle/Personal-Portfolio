import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';

const SOCIALS = [
  { label: 'GitHub', sub: 'github.com/yourname', href: '#', accent: '#00e5a0' },
  { label: 'LinkedIn', sub: 'linkedin.com/in/yourname', href: '#', accent: '#7c6fff' },
  { label: 'LeetCode', sub: 'leetcode.com/yourname', href: '#', accent: '#ffa116' },
];

const iStyle = {
  width:'100%', padding:'14px 18px',
  background:'rgba(255,255,255,0.025)',
  border:'1px solid var(--border2)',
  color:'var(--text)', fontFamily:"'Space Mono',monospace",
  fontSize:'13px', outline:'none', transition:'border-color 0.3s, box-shadow 0.3s',
  resize:'none',
};

function Field({ tag: Tag = 'input', name, placeholder, value, onChange, error, rows, maxLength }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom:'4px' }}>
      <div style={{ position:'relative' }}>
        <Tag
          name={name} placeholder={placeholder} value={value}
          onChange={onChange} rows={rows} maxLength={maxLength}
          style={{
            ...iStyle,
            borderColor: error ? 'rgba(255,107,107,0.5)' : focused ? 'rgba(0,229,160,0.5)' : 'var(--border2)',
            boxShadow: focused ? '0 0 0 3px rgba(0,229,160,0.07)' : 'none',
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {Tag === 'textarea' && maxLength && (
          <span style={{ position:'absolute', bottom:'10px', right:'14px', fontFamily:"'Space Mono',monospace", fontSize:'10px', color: value.length > maxLength*0.85 ? 'var(--accent3)' : 'var(--muted)' }}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {error && <p style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--accent3)', marginTop:'5px', letterSpacing:'1px' }}>⚠ {error}</p>}
    </div>
  );
}

export default function Contact({ addToast }) {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      addToast(res.data.message || 'Message sent successfully!', 'success');
      setForm({ name:'', email:'', subject:'', message:'' });
    } catch (err) {
      addToast(err.response?.data?.message || 'Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ background:'var(--bg2)', position:'relative', zIndex:1 }}>
      <div className="sw" ref={ref}>
        <div className="sh">
          <span className="sn">04 /</span>
          <h2 className="st">Contact</h2>
          <div className="sl" />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'5fr 7fr', gap:'72px', alignItems:'start', maxWidth:'1100px' }}>
          {/* Left */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition:'all 0.6s ease' }}>
            <h3 style={{ fontSize:'clamp(30px,4vw,52px)', fontWeight:800, lineHeight:1.05, marginBottom:'20px' }}>
              Let's <span style={{ color:'var(--accent)' }}>build</span><br />something<br />great
            </h3>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:'12px', color:'var(--muted)', lineHeight:1.9, marginBottom:'40px', letterSpacing:'0.5px' }}>
              Open to full-time roles, freelance gigs, and interesting collaborations. I usually reply within 24 hours.
            </p>

            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'var(--accent)', letterSpacing:'3px', textTransform:'uppercase', marginBottom:'20px' }}>
              // Find me on
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href}
                  style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', background:'var(--bg3)', border:'1px solid var(--border2)', textDecoration:'none', transition:'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.accent+'60'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  <div>
                    <div style={{ fontSize:'14px', fontWeight:700, color:s.accent, marginBottom:'2px' }}>{s.label}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'var(--muted)' }}>{s.sub}</div>
                  </div>
                  <span style={{ color:s.accent, fontSize:'16px' }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit}
            style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition:'all 0.6s ease 0.15s', display:'flex', flexDirection:'column', gap:'16px' }}>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <Field name="name" placeholder="Your Name *" value={form.name} onChange={handleChange} error={errors.name} />
              <Field name="email" placeholder="Email Address *" value={form.email} onChange={handleChange} error={errors.email} />
            </div>

            <Field name="subject" placeholder="Subject (optional)" value={form.subject} onChange={handleChange} />

            <Field tag="textarea" name="message" placeholder="Tell me about your project or opportunity... *" value={form.message} onChange={handleChange} error={errors.message} rows={6} maxLength={500} />

            <button type="submit" className="btn btn-p"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer', alignSelf:'flex-start', marginTop:'4px' }}>
              {loading ? (
                <>
                  <span style={{ width:'12px', height:'12px', border:'2px solid #07070e', borderTop:'2px solid transparent', borderRadius:'50%', animation:'spinSlow 0.8s linear infinite', display:'inline-block' }} />
                  Sending...
                </>
              ) : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
