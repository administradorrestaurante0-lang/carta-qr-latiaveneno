/* App component — QR Tía Veneno Oficial · Solo visualización */
const { useState, useEffect, useMemo, useRef } = React;

// ===== utils =====
const fmtCLP = (n) => "$" + n.toLocaleString("es-CL").replace(/,/g, ".");
const cls = (...a) => a.filter(Boolean).join(" ");
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const TAG_CLASS = {
  "popular": "tag--magenta",
  "recomendado": "tag--magenta",
  "clásico": "tag--turq",
  "fresco": "tag--turq",
  "vegetariano": "tag--turq",
  "compartir": "tag--plum",
  "XL": "tag--plum",
  "premium": "tag--plum",
  "de la casa": "tag--magenta",
  "fuerte": "",
  "peruana": "",
  "chilena": "",
};

// ===== Icons =====
const I = {
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  close:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  info:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>,
  share:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8 11 8-4M8 13l8 4"/></svg>,
  phone:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3.08a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.8 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.5 13.5 3.5 12 3.5 7.3 7.3 3.5 12 3.5S20.5 7.3 20.5 12 16.7 20 12 20z"/></svg>,
  pin:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-7.5 8-13a8 8 0 0 0-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>,
  clock:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
};

// ===== Hero splash =====
function Hero({ onEnter }) {
  const vidRef = useRef(null);
  useEffect(() => { if (vidRef.current) vidRef.current.play().catch(() => {}); }, []);
  return (
    <div className="hero" id="hero">
      <video ref={vidRef} className="hero__video" src="assets/hero.mp4" autoPlay loop muted playsInline />
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="eyebrow" style={{color:"rgba(255,255,255,.85)"}}>Cocina peruana · Chile</div>
        <h1 className="hero__logo">La Tía<br/>Veneno</h1>
        <div className="hero__tag">Sabor a Perú</div>
        <div className="hero__divider">Carta</div>
        <button className="hero__cta" onClick={onEnter}>
          Ver la carta
          {I.arrowRight}
        </button>
      </div>
      <div className="hero__bottom">Toca para entrar</div>
    </div>
  );
}

// ===== Header =====
function Header({ onInfo }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand__name">La Tía Veneno</div>
        <div className="brand__tag">Sabor a Perú</div>
      </div>
      <button className="icon-btn" onClick={onInfo} aria-label="Información">{I.info}</button>
    </header>
  );
}

// ===== Search bar =====
function Search({ value, onChange }) {
  return (
    <div className="search">
      <div className="search__field">
        {I.search}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar plato, ingrediente…"
          inputMode="search"
        />
        {value && (
          <button className="search__clear" onClick={() => onChange("")} aria-label="Limpiar">
            {I.close}
          </button>
        )}
      </div>
    </div>
  );
}

// ===== Tabs =====
function Tabs({ menu, active, onPick }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current?.querySelector(`[data-tab="${active}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);
  return (
    <div className="tabs-shell">
      <div className="tabs" ref={ref}>
        {menu.map((s) => (
          <button
            key={s.id}
            data-tab={s.id}
            className={cls("tab", active === s.id && "is-active")}
            onClick={() => onPick(s.id)}
          >
            <span className="tab__icon">{s.icon}</span>
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== Dish card — solo visualización, sin botón agregar =====
function Dish({ item, onOpen }) {
  const hasImg = !!item.img;
  return (
    <div className={cls("dish", !hasImg && "no-image")} onClick={() => onOpen(item)} data-comment-anchor={`dish-${item.id}`}>
      <div className="dish__body">
        <div className="dish__head">
          <h3 className="dish__name">{item.name}</h3>
          {!hasImg && <span className="dish__price">{fmtCLP(item.price)}</span>}
        </div>
        {item.desc && <p className="dish__desc">{item.desc}</p>}
        {hasImg && <span className="dish__price">{fmtCLP(item.price)}</span>}
        {item.tags && item.tags.length > 0 && (
          <div className="dish__tags">
            {item.tags.map((t) => <span key={t} className={cls("tag", TAG_CLASS[t] || "")}>{t}</span>)}
          </div>
        )}
      </div>
      {hasImg && (
        <div className="dish__media">
          <img src={item.img} alt={item.name} loading="lazy" />
        </div>
      )}
    </div>
  );
}

// ===== Modal genérico =====
function Modal({ open, onClose, children, label }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <div className={cls("modal", open && "is-open")} onClick={onClose} role="dialog" aria-label={label}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet__handle" />
        <button className="sheet__close" onClick={onClose} aria-label="Cerrar">{I.close}</button>
        <div className="sheet__scroll">{children}</div>
      </div>
    </div>
  );
}

// ===== Dish detail — solo info, sin agregar al carrito =====
function DishDetail({ item, onClose }) {
  if (!item) return null;
  return (
    <>
      {item.img && (
        <div className="sheet__hero">
          <img src={item.img} alt={item.name} />
        </div>
      )}
      <div className="sheet__body">
        <div className="sheet__cat">{item.categoryName}</div>
        <h2 className="sheet__name">{item.name}</h2>
        <div className="sheet__row">
          <span className="sheet__price">{fmtCLP(item.price)}</span>
        </div>
        {item.desc && <p className="sheet__desc">{item.desc}</p>}
        {item.tags && item.tags.length > 0 && (
          <div className="sheet__tags">
            {item.tags.map((t) => <span key={t} className={cls("tag", TAG_CLASS[t] || "")}>{t}</span>)}
          </div>
        )}
        <button className="btn btn--ghost" style={{width:"100%", marginTop:8}} onClick={onClose}>
          Volver a la carta
        </button>
      </div>
    </>
  );
}

// ===== Info sheet =====
function InfoSheet() {
  const r = window.RESTAURANT;
  const share = async () => {
    const data = { title: r.name, text: `${r.name} — ${r.tagline}. Mira la carta:`, url: location.href };
    if (navigator.share) try { await navigator.share(data); } catch {}
    else {
      try { await navigator.clipboard.writeText(location.href); alert("Enlace copiado"); } catch {}
    }
  };
  return (
    <div className="info-sheet">
      <div className="eyebrow" style={{paddingTop:8}}>{r.city}</div>
      <h2>{r.name}</h2>
      <p style={{margin:"4px 0 0", color:"var(--ink-2)", fontStyle:"italic", fontFamily:"var(--font-display)", fontSize:18}}>{r.tagline}</p>

      <div className="contact-row">
        <a className="contact-btn wa" href={`https://wa.me/${r.whatsapp}`} target="_blank" rel="noreferrer">
          <span className="ic">{I.whatsapp}</span>
          <span className="lbl">WhatsApp</span>
          <span className="sub">Reserva o pedido</span>
        </a>
        <a className="contact-btn" href={`tel:${r.phone.replace(/\s/g,"")}`}>
          <span className="ic">{I.phone}</span>
          <span className="lbl">Llamar</span>
          <span className="sub">{r.phone}</span>
        </a>
        <button className="contact-btn" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(r.address)}`, "_blank")}>
          <span className="ic">{I.pin}</span>
          <span className="lbl">Cómo llegar</span>
          <span className="sub">Ver mapa</span>
        </button>
        <button className="contact-btn" onClick={share}>
          <span className="ic">{I.share}</span>
          <span className="lbl">Compartir</span>
          <span className="sub">La carta</span>
        </button>
      </div>

      <div className="info-card">
        <h3>{I.clock} Horarios</h3>
        <ul className="hours-list">
          {r.hours.map((h, i) => <li key={i}><span className="day">{h.d}</span><span className="h">{h.h}</span></li>)}
        </ul>
      </div>

      <div className="info-card">
        <h3>{I.pin} Dirección</h3>
        <p style={{margin:0, fontSize:14.5, lineHeight:1.5}}>{r.address}</p>
      </div>

      <div className="info-card">
        <h3>{I.calendar} Reservas</h3>
        <p style={{margin:"0 0 12px", fontSize:14.5, color:"var(--ink-2)"}}>Reserva mesa por WhatsApp y te confirmamos al toque.</p>
        <a className="btn btn--magenta" style={{width:"100%"}} href={`https://wa.me/${r.whatsapp}?text=${encodeURIComponent("Hola! Quiero reservar una mesa para...")}`} target="_blank" rel="noreferrer">
          {I.whatsapp} Reservar por WhatsApp
        </a>
      </div>

      <div style={{marginTop:24}}>
        <div className="eyebrow" style={{marginBottom:10}}>Galería del local</div>
        <div className="gallery">
          {r.gallery.map((src, i) => <img key={i} src={src} alt="" loading="lazy" />)}
        </div>
      </div>

      <div style={{marginTop:24}}>
        <div className="eyebrow" style={{marginBottom:10}}>Lo que dicen</div>
        {r.testimonials.map((t, i) => (
          <div key={i} className="testimonial">
            <div className="testimonial__stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
            <p className="testimonial__text">"{t.text}"</p>
            <div className="testimonial__name">— {t.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Main App =====
function App() {
  const menu = window.MENU;
  const [showHero, setShowHero] = useState(true);
  const [active, setActive] = useState(menu[0].id);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null); // 'info' | null
  const [detail, setDetail] = useState(null);
  const observerRef = useRef(null);

  const enter = () => setShowHero(false);

  // search filter
  const filtered = useMemo(() => {
    if (!query.trim()) return menu;
    const q = norm(query);
    return menu
      .map((s) => ({ ...s, items: s.items.filter((i) => norm(i.name).includes(q) || norm(i.desc || "").includes(q)) }))
      .filter((s) => s.items.length > 0);
  }, [query, menu]);

  // intersection observer para tab activo
  useEffect(() => {
    if (showHero || query) return;
    const sections = filtered.map((s) => document.getElementById(`sec-${s.id}`)).filter(Boolean);
    const opts = { rootMargin: "-50% 0px -45% 0px", threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        const id = visible[0].target.id.replace("sec-", "");
        setActive(id);
      }
    }, opts);
    sections.forEach((s) => obs.observe(s));
    observerRef.current = obs;
    return () => obs.disconnect();
  }, [filtered, showHero, query]);

  const scrollToSection = (id) => {
    setActive(id);
    const el = document.getElementById(`sec-${id}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const openDetail = (item) => {
    const cat = menu.find((s) => s.items.some((i) => i.id === item.id));
    setDetail({ ...item, categoryName: cat?.name });
  };

  return (
    <div className="app">
      {showHero && <Hero onEnter={enter} />}

      <Header onInfo={() => setOpen("info")} />
      <Search value={query} onChange={setQuery} />
      <Tabs menu={menu} active={active} onPick={scrollToSection} />

      <main>
        {filtered.length === 0 && (
          <div className="no-results">
            <h3>Sin resultados</h3>
            <p>No encontramos "{query}" en la carta. Probá con otra palabra.</p>
          </div>
        )}
        {filtered.map((s) => (
          <section key={s.id} id={`sec-${s.id}`} className="section" data-screen-label={s.name}>
            <div className="section__head">
              <div className="eyebrow">{s.icon} · {s.items.length} platos</div>
              <h2 className="section__title">{s.name}</h2>
              <p className="section__blurb">{s.blurb}</p>
              <div className="section__rule">La Tía Veneno</div>
            </div>
            {s.items.map((it) => (
              <Dish key={it.id} item={it} onOpen={openDetail} />
            ))}
          </section>
        ))}

        <footer className="app-foot">
          <div className="app-foot__logo">La Tía Veneno</div>
          <div className="app-foot__tag">Sabor a Perú</div>
          <div>{window.RESTAURANT.address}</div>
          <div style={{marginTop:6}}>{window.RESTAURANT.phone}</div>
          <div style={{marginTop:14, opacity:.7}}>© {new Date().getFullYear()} · Todos los derechos reservados</div>
        </footer>
      </main>

      {/* Modal Info */}
      <Modal open={open === "info"} onClose={() => setOpen(null)} label="Información">
        <InfoSheet />
      </Modal>

      {/* Modal Detalle plato */}
      <Modal open={!!detail} onClose={() => setDetail(null)} label="Detalle plato">
        <DishDetail item={detail} onClose={() => setDetail(null)} />
      </Modal>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
