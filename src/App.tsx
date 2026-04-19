import React, { useState, useEffect, useRef, MouseEvent } from 'react';

// --- Tilt Component ---
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width;
    const y = (e.clientY - r.top - r.height / 2) / r.height;
    cardRef.current.style.transform = `perspective(700px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(6px)`;
    cardRef.current.style.transition = 'transform 0.08s ease';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(700px) rotateY(0) rotateX(0) translateZ(0)';
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
  };

  return (
    <div
      ref={cardRef}
      className={`cat-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// --- Magnetic Component ---
const Magnetic = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (elRef.current) {
      boundsRef.current = elRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!elRef.current) return;
    if (!boundsRef.current) boundsRef.current = elRef.current.getBoundingClientRect();
    const b = boundsRef.current;
    const x = e.clientX - b.left - b.width / 2;
    const y = e.clientY - b.top - b.height / 2;
    elRef.current.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    elRef.current.style.transition = 'transform 0.1s ease';
  };

  const handleMouseLeave = () => {
    if (!elRef.current) return;
    elRef.current.style.transform = 'translate(0,0)';
    elRef.current.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
  };

  return (
    <div
      ref={elRef}
      className={`${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return (
    <div className={`pg ${isDark ? 'dark' : ''}`}>
      <div className="tb">
        <span className="tb-l">velnoraai.app · design preview</span>
        <div className="toggle-wrap">
          <span className="tog-label">{isDark ? 'DARK' : 'LIGHT'}</span>
          <div className="tog" onClick={toggleTheme}>
            <div className="tog-k"></div>
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="logo">Veln<span>o</span>ra</div>
        <div className="nav-links">
          <div className="nl">Tools</div>
          <div className="nl">Convert</div>
          <div className="nl">Compress</div>
          <div className="nl">Blog</div>
          <Magnetic className="mag-wrap">
            <div className="nav-btn">Open workspace</div>
          </Magnetic>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-eyebrow">
          <div className="eyebrow-dot"></div>165 free tools · No signup needed
        </div>
        <h1 className="h1">Work smarter.<br />Ship <em>faster.</em></h1>
        <p className="hero-sub">The internet's free utility workspace. Convert files, compress media, write content, and build workflows — all in your browser.</p>
        <div className="hero-actions">
          <Magnetic className="mag-wrap"><div className="btn-p">Browse all tools &nbsp;&rarr;</div></Magnetic>
          <Magnetic className="mag-wrap"><div className="btn-g">Watch demo &nbsp;&#x2197;</div></Magnetic>
        </div>
      </section>

      <div className="stats">
        <div className="stat"><div class="stat-n">165<em>+</em></div><div class="stat-l">Free tools</div></div>
        <div className="stat"><div class="stat-n">18</div><div class="stat-l">Categories</div></div>
        <div className="stat"><div class="stat-n">1<em>k</em></div><div class="stat-l">SEO guides</div></div>
        <div className="stat"><div class="stat-n">0</div><div class="stat-l">Signup needed</div></div>
      </div>

      <div className="mq-wrap">
        <div className="mq">
          {Array(24).fill(0).map((_, i) => {
            const items = [
              ['/utility/convert/mp4-to-gif'],
              ['/utility/compress/pdf-compressor'],
              ['/tools/developer-data-core/json-formatter-validator'],
              ['/tools/seo-content-ops/seo-title-optimizer'],
              ['/utility/compress/image-compressor'],
              ['/tools/business-finance/roi-calculator'],
              ['/tools/design-ux-brand/gradient-builder'],
              ['/tools/developer-data-core/csv-to-json-converter'],
              ['/utility/tools/pdf-merge'],
              ['/utility/convert/webp-to-png'],
              ['/tools/productivity-planning/habit-tracker'],
              ['/tools/developer-advanced/git-commit-message-builder']
            ];
            const url = items[i % items.length][0];
            return (
              <span className="mq-item" key={i}>
                velnoraai.app<span className="mq-slug">{url}</span><span className="mq-sep"></span>
              </span>
            );
          })}
        </div>
      </div>

      <section className="sec">
        <div className="sec-hd">
          <div className="sec-title">Browse categories</div>
          <div className="sec-more">View all 18 &rarr;</div>
        </div>
        <div className="cat-grid">
          {[
            { id: '01', name: 'Writing & Messaging', count: 15 },
            { id: '02', name: 'SEO & Content Ops', count: 15 },
            { id: '03', name: 'Developer Tools', count: 30 },
            { id: '04', name: 'Business & Finance', count: 15 },
            { id: '05', name: 'Convert & Compress', count: 26 },
            { id: '06', name: 'Design, UX & Brand', count: 15 },
            { id: '07', name: 'Productivity & Planning', count: 15 },
            { id: '08', name: 'Education & Learning', count: 15 },
          ].map((cat, i) => (
            <TiltCard key={i}>
              <div className="cat-idx">{cat.id}</div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-cnt">{cat.count} tools</div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="sec-hd">
          <div className="sec-title">Popular right now</div>
          <div className="sec-more">All tools &rarr;</div>
        </div>
        <div className="tool-grid">
          {[
            { name: 'SEO Title Optimizer', badge: 'SEO', desc: 'Optimize page titles for higher click-through in search results.' },
            { name: 'MP4 to GIF', badge: 'Convert', desc: 'Convert any MP4 clip to a loopable GIF, in-browser.' },
            { name: 'JSON Formatter', badge: 'Dev', desc: 'Validate and beautify any JSON payload instantly.' },
            { name: 'PDF Compressor', badge: 'Compress', desc: 'Reduce PDF size without losing visible quality.' },
            { name: 'ROI Calculator', badge: 'Finance', desc: 'Calculate return on investment for any spend.' },
            { name: 'Image Compressor', badge: 'Compress', desc: 'Compress JPG, PNG, WebP with live before/after preview.' },
          ].map((tool, i) => (
            <div className="tool-card" key={i}>
              <div className="tool-top">
                <span className="tool-name">{tool.name}</span>
                <span className="tool-badge">{tool.badge}</span>
              </div>
              <div className="tool-desc">{tool.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="sec-hd">
          <div className="sec-title">Quick access</div>
        </div>
        <div className="surf-grid">
          {[
            { num: '17', name: 'Convert', desc: 'Video, audio, image, and GIF conversions.', link: 'Open Convert →' },
            { num: '08', name: 'Compress', desc: 'Reduce size across video, image, PDF, and GIF.', link: 'Open Compress →' },
            { num: '∞', name: 'All Tools', desc: 'Full directory — 165 tools, 18 categories.', link: 'Browse all →' },
          ].map((surf, i) => (
            <div className="surf-card" key={i}>
              <div className="surf-num">{surf.num}</div>
              <div className="surf-name">{surf.name}</div>
              <div className="surf-desc">{surf.desc}</div>
              <div className="surf-link">{surf.link}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">Veln<span>o</span>ra</div>
        <div className="footer-links">
          <span className="footer-link">Tools</span>
          <span className="footer-link">Convert</span>
          <span className="footer-link">Compress</span>
          <span className="footer-link">Blog</span>
          <span className="footer-link">About</span>
          <span className="footer-link">Contact</span>
        </div>
        <div className="footer-r">© {(new Date()).getFullYear()} velnoraai.app</div>
      </footer>
    </div>
  );
}
