import { useEffect, useMemo, useState, type FormEvent, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { HashRouter, Link, NavLink, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowRight, CalendarDays, Check, ChevronDown, CircleHelp, Clock3, ExternalLink, Filter, Heart, Menu, Plus, QrCode, ScanLine, Search, Shirt, Sparkles, Tag, UserRound, X } from 'lucide-react';
import { guideCards, images, inventory, occasions, slotLabels, type Filters, type GarmentSlot, type Item, type Occasion } from '@/data';

type Outfit = Partial<Record<GarmentSlot, Item>>;

type PersistedDemoState = {
  activeOccasion: Occasion;
  filters: Filters;
  outfit: Outfit;
  selectedSizes: Record<string, string>;
  pickupDate: string;
  pickupTime: string;
  pickedUp: boolean;
  reservationComplete: boolean;
  currentReservationId: string;
  savedIds: string[];
};

const demoStateKey = 'career-closet-demo-state-v3';
const demoReservationsKey = 'career-closet-demo-reservations-v3';

type DemoReservation = {
  id: string;
  itemIds: string[];
  sizes: Record<string, string>;
  pickupDate: string;
  pickupTime: string;
  status: 'Reserved' | 'Picked up';
};

// A QR can carry the sample reservation itself, so the prototype works without
// a backend even when a presentation audience scans it on another device.
// Demo data only: never put real student information in this URL.
function encodeDemoReservation(reservation: DemoReservation): string {
  const bytes = new TextEncoder().encode(JSON.stringify(reservation));
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeDemoReservation(payload: string): DemoReservation | null {
  try {
    const binary = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const json = new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
    const raw: unknown = JSON.parse(json);
    if (!raw || typeof raw !== 'object') return null;
    const value = raw as Partial<DemoReservation>;
    if (!value.id || !/^CC-[A-Z0-9]{4,12}$/.test(value.id)) return null;
    if (!Array.isArray(value.itemIds) || !value.itemIds.every((id) => typeof id === 'string' && inventory.some((item) => item.id === id))) return null;
    if (!value.sizes || typeof value.sizes !== 'object') return null;
    if (typeof value.pickupDate !== 'string' || typeof value.pickupTime !== 'string') return null;
    return {
      id: value.id,
      itemIds: value.itemIds,
      sizes: Object.fromEntries(value.itemIds.map((id) => {
        const item = inventory.find((entry) => entry.id === id)!;
        const selected = value.sizes![id];
        return [id, item.sizes.includes(selected) ? selected : item.sizes[0]];
      })),
      pickupDate: value.pickupDate.slice(0, 90),
      pickupTime: value.pickupTime.slice(0, 90),
      status: value.status === 'Picked up' ? 'Picked up' : 'Reserved',
    };
  } catch {
    return null;
  }
}

function qrStaffUrl(reservation: DemoReservation): string {
  const base = `${window.location.origin}${window.location.pathname}`;
  const data = encodeURIComponent(encodeDemoReservation(reservation));
  return `${base}#/staff?id=${encodeURIComponent(reservation.id)}&demo=${data}`;
}

function loadDemoReservations(): DemoReservation[] {
  try {
    return JSON.parse(localStorage.getItem(demoReservationsKey) || '[]');
  } catch {
    return [];
  }
}

function saveDemoReservations(reservations: DemoReservation[]) {
  localStorage.setItem(demoReservationsKey, JSON.stringify(reservations));
}


function loadDemoState(): Partial<PersistedDemoState> {
  try {
    const raw = localStorage.getItem(demoStateKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
type AppState = {
  activeOccasion: Occasion;
  filters: Filters;
  outfit: Outfit;
  selectedSizes: Record<string, string>;
  savedIds: string[];
  pickupDate: string;
  pickupTime: string;
  pickedUp: boolean;
  reservationComplete: boolean;
  currentReservationId: string;
};

type AppActions = {
  setActiveOccasion: (occasion: Occasion) => void;
  setFilters: Dispatch<SetStateAction<Filters>>;
  addToOutfit: (item: Item) => void;
  removeFromOutfit: (slot: GarmentSlot) => void;
  clearOutfit: () => void;
  setSelectedSize: (itemId: string, size: string) => void;
  toggleSaved: (itemId: string) => void;
  buildRecommendedLook: (occasion: Occasion) => void;
  setPickupDate: (date: string) => void;
  setPickupTime: (time: string) => void;
  setPickedUp: (pickedUp: boolean) => void;
  confirmReservation: () => void;
};

function App() {
  const initial = useMemo(() => loadDemoState(), []);
  const [activeOccasion, setActiveOccasionState] = useState<Occasion>(initial.activeOccasion ?? 'Interview');
  const [filters, setFilters] = useState<Filters>(initial.filters ?? { occasion: 'Interview', category: 'All', size: 'All sizes', availability: 'Available now' });
  const [outfit, setOutfit] = useState<Outfit>(initial.outfit ?? {});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(initial.selectedSizes ?? {});
  const [savedIds, setSavedIds] = useState<string[]>(initial.savedIds ?? []);
  const [pickupDate, setPickupDate] = useState(initial.pickupDate ?? 'Thursday, November 12');
  const [pickupTime, setPickupTime] = useState(initial.pickupTime ?? '2:30 PM – 3:00 PM');
  const [pickedUp, setPickedUp] = useState(initial.pickedUp ?? false);
  const [reservationComplete, setReservationComplete] = useState(initial.reservationComplete ?? false);
  const [currentReservationId, setCurrentReservationId] = useState(initial.currentReservationId ?? '');
  const navigate = useNavigate();

  useEffect(() => {
    const persisted: PersistedDemoState = { activeOccasion, filters, outfit, selectedSizes, pickupDate, pickupTime, pickedUp, reservationComplete, currentReservationId, savedIds };
    localStorage.setItem(demoStateKey, JSON.stringify(persisted));
  }, [activeOccasion, filters, outfit, selectedSizes, pickupDate, pickupTime, pickedUp, reservationComplete, currentReservationId, savedIds]);

  const setActiveOccasion = (occasion: Occasion) => {
    setActiveOccasionState(occasion);
    setFilters((current) => ({ ...current, occasion }));
  };
  const addToOutfit = (item: Item) => {
    setOutfit((current) => ({ ...current, [item.slot]: item }));
    setSelectedSizes((current) => ({ ...current, [item.id]: current[item.id] ?? item.sizes[0] }));
    navigate('/builder');
  };
  const removeFromOutfit = (slot: GarmentSlot) => setOutfit((current) => {
    const next = { ...current };
    const removed = next[slot];
    delete next[slot];
    if (removed) setSelectedSizes((sizes) => { const updated = { ...sizes }; delete updated[removed.id]; return updated; });
    return next;
  });
  const buildRecommendedLook = (occasion: Occasion) => {
    const next: Outfit = {};
    inventory.filter((item) => item.occasions.includes(occasion)).forEach((item) => { if (!next[item.slot]) next[item.slot] = item; });
    setActiveOccasion(occasion);
    setOutfit(next);
    setSelectedSizes(Object.fromEntries(Object.values(next).filter((item): item is Item => Boolean(item)).map((item) => [item.id, item.sizes[0]])));
    navigate('/builder');
  };
  const confirmReservation = () => {
    const id = `CC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const itemIds = Object.values(outfit).filter((item): item is Item => Boolean(item)).map((item) => item.id);
    const reservation: DemoReservation = { id, itemIds, sizes: Object.fromEntries(itemIds.map((itemId) => [itemId, selectedSizes[itemId] ?? inventory.find((item) => item.id === itemId)!.sizes[0]])), pickupDate, pickupTime, status: 'Reserved' };
    saveDemoReservations([reservation, ...loadDemoReservations().filter((entry) => entry.id !== id)]);
    setCurrentReservationId(id);
    setReservationComplete(true);
    setPickedUp(false);
    navigate('/confirmation');
  };
  const setSelectedSize = (itemId: string, size: string) => setSelectedSizes((current) => ({ ...current, [itemId]: size }));
  const toggleSaved = (itemId: string) => setSavedIds((current) => current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]);
  const clearOutfit = () => { setOutfit({}); setSelectedSizes({}); };
  const actions: AppActions = { setActiveOccasion, setFilters, addToOutfit, removeFromOutfit, clearOutfit, setSelectedSize, toggleSaved, buildRecommendedLook, setPickupDate, setPickupTime, setPickedUp, confirmReservation };
  const state: AppState = { activeOccasion, filters, outfit, selectedSizes, savedIds, pickupDate, pickupTime, pickedUp, reservationComplete, currentReservationId };

  return <div className="app-shell"><SiteHeader /><Routes><Route path="/" element={<HomePage state={state} actions={actions} />} /><Route path="/browse" element={<BrowsePage state={state} actions={actions} />} /><Route path="/builder" element={<BuilderPage state={state} actions={actions} />} /><Route path="/guide" element={<GuidePage actions={actions} />} /><Route path="/reservation" element={<ReservationPage state={state} actions={actions} />} /><Route path="/confirmation" element={<ConfirmationPage state={state} />} /><Route path="/staff" element={<StaffPage state={state} actions={actions} />} /><Route path="*" element={<HomePage state={state} actions={actions} />} /></Routes><SiteFooter /></div>;
}

function SiteHeader() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const links = [['/browse', 'Browse'], ['/builder', 'Outfit Builder'], ['/guide', 'Outfit Guide'], ['/staff', 'Staff Demo']];
  return <header className="site-header"><Link className="brand" to="/" aria-label="Career Closet home" onClick={() => setMobileMenu(false)}><span className="brand-mark"><span>BRAVEN</span><span className="brand-cross">×</span><span>SFSU</span></span><span className="brand-title">CAREER CLOSET</span></Link><nav className={`main-nav ${mobileMenu ? 'is-open' : ''}`} aria-label="Main navigation">{links.map(([path, label]) => <NavLink key={path} to={path} onClick={() => setMobileMenu(false)}>{label}</NavLink>)}</nav><div className="header-actions"><span className="prototype-label">CAPSTONE PROTOTYPE</span><Link className="button button-coral header-cta" to="/browse">Find an outfit <ArrowRight size={16} /></Link><button className="icon-button menu-toggle" onClick={() => setMobileMenu((current) => !current)} aria-label="Toggle navigation menu" aria-expanded={mobileMenu}><Menu size={22} /></button></div></header>;
}

function SiteFooter() {
  return <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><span>BRAVEN</span><span className="brand-cross">×</span><span>SFSU</span></span><strong>CAREER CLOSET</strong></div><p>Student-designed prototype created for the Braven Capstone Challenge.<br />Not an official production Braven or SFSU service.</p><div className="footer-links"><Link to="/">Back to home <ArrowRight size={15} /></Link><span>© 2026 Career Closet</span></div></footer>;
}

function PageIntro({ eyebrow, title, body, dark = false }: { eyebrow: string; title: ReactNode; body: string; dark?: boolean }) {
  return <div className={`page-intro ${dark ? 'page-intro-dark' : ''}`}><p className={`eyebrow ${dark ? 'eyebrow-light' : ''}`}>{eyebrow}</p><h1>{title}</h1><p>{body}</p></div>;
}

function HomePage({ state, actions }: { state: AppState; actions: AppActions }) {
  return <main><section className="hero-section"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> Braven × SFSU <span className="eyebrow-divider" /> Student access, reimagined</p><h1>Dress for the <em>opportunity</em> ahead.</h1><p className="hero-lede">Borrow professional clothing for interviews, networking events, career fairs, and more. Find a look that helps you feel ready for what comes next.</p><div className="hero-buttons"><Link className="button button-dark" to="/browse">Find an outfit <ArrowRight size={17} /></Link><Link className="text-button" to="/browse">Browse the closet <ArrowRight size={16} /></Link></div><div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span></div><p><strong>Made for students.</strong><br />Built to make showing up feel easier.</p></div></div><div className="hero-visual"><div className="hero-image-wrap"><img src={images.group} alt="Students and professionals showcasing a range of work-ready outfits" /><div className="image-caption"><span>01 / 05</span><span>Professional, on your terms</span></div></div><div className="hero-shape hero-shape-coral" /><div className="hero-shape hero-shape-lime" /><div className="hero-shape hero-shape-blue" /><div className="hero-sticker"><Sparkles size={18} /><span>YOUR NEXT<br /><strong>YES</strong></span></div></div></section><HowItWorks /><HomeOccasions state={state} actions={actions} /><SfsuSection actions={actions} /></main>;
}

function HowItWorks() {
  const steps = [{ number: '01', title: 'Find', body: 'Browse clothing based on your event, size, and what is available.', icon: Shirt }, { number: '02', title: 'Reserve', body: 'Build a complete outfit and choose a sample pickup time.', icon: CalendarDays }, { number: '03', title: 'Pick up', body: 'Show your reservation QR code when you arrive.', icon: QrCode }];
  return <section className="process-section section-dark"><div className="section-intro process-intro"><p className="eyebrow eyebrow-light">A simpler way to prepare</p><h2>How Career Closet <em>works.</em></h2><p>One place to find the pieces, build the look, and get ready to walk in with confidence.</p></div><div className="process-grid">{steps.map(({ number, title, body, icon: Icon }) => <div className="process-card" key={number}><span className="process-number">{number}</span><div className="process-icon"><Icon size={22} /></div><h3>{title}</h3><p>{body}</p></div>)}</div></section>;
}

function HomeOccasions({ state, actions }: { state: AppState; actions: AppActions }) {
  return <section className="occasion-section"><div className="section-intro"><p className="eyebrow">Start with the moment</p><h2>What are you <em>dressing for?</em></h2><p>Tell us where you are headed. We will help you find pieces that fit the moment and feel like you.</p></div><div className="occasion-grid">{occasions.map((occasion, index) => <Link className={`occasion-card tone-${occasion.tone} ${state.activeOccasion === occasion.name ? 'is-active' : ''}`} key={occasion.name} to={`/browse?occasion=${encodeURIComponent(occasion.name)}`} onClick={() => actions.setActiveOccasion(occasion.name)}><span className="occasion-index">0{index + 1}</span><span className="occasion-name">{occasion.name}</span><span className="occasion-note">{occasion.note}</span><ArrowRight size={20} className="occasion-arrow" /></Link>)}</div><Link className="guide-link" to="/guide"><CircleHelp size={18} /> Not sure what to wear? <strong>Professional Outfit Guide</strong> <ArrowRight size={16} /></Link></section>;
}

function SfsuSection({ actions }: { actions: AppActions }) {
  return <section className="sfsu-section"><div className="sfsu-orbit orbit-one" /><div className="sfsu-orbit orbit-two" /><div className="sfsu-content"><p className="eyebrow eyebrow-purple">Designed for SFSU students</p><h2>Professional clothing should be easier to <em>access.</em></h2><p>Career Closet is a proposed solution developed through the Braven Capstone Challenge to make professional clothing easier to discover, reserve, and access.</p><div className="sfsu-flow"><Link to="/browse">Browse</Link><ArrowRight size={15} /><Link to="/builder">Build</Link><ArrowRight size={15} /><Link to="/reservation">Reserve</Link><ArrowRight size={15} /><Link to="/confirmation">QR pickup</Link></div></div><div className="sfsu-side"><span className="side-label">THE CHALLENGE</span><strong>Making professional clothing easier for students to access and navigate.</strong><span className="side-label">OUR SOLUTION</span><strong>One clear path from “what do I wear?” to “I’m ready.”</strong><button className="text-button" onClick={() => actions.buildRecommendedLook('Interview')}>Start with an interview look <ArrowRight size={15} /></button></div></section>;
}

function BrowsePage({ state, actions }: { state: AppState; actions: AppActions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [query, setQuery] = useState('');
  const queryOccasion = searchParams.get('occasion') as Occasion | null;
  const activeFilters = useMemo(() => queryOccasion && occasions.some((item) => item.name === queryOccasion) && state.filters.occasion !== queryOccasion ? { ...state.filters, occasion: queryOccasion } : state.filters, [queryOccasion, state.filters]);
  const filteredItems = useMemo(() => inventory.filter((item) => (activeFilters.occasion === 'All occasions' || item.occasions.includes(activeFilters.occasion as Occasion)) && (activeFilters.category === 'All' || item.category === activeFilters.category) && (activeFilters.size === 'All sizes' || item.sizes.includes(activeFilters.size)) && (activeFilters.availability === 'All items' || item.available > 0) && `${item.name} ${item.color} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [activeFilters, query]);
  const setOccasion = (value: string) => { actions.setFilters((current) => ({ ...current, occasion: value })); if (value !== 'All occasions') actions.setActiveOccasion(value as Occasion); setSearchParams(value === 'All occasions' ? {} : { occasion: value }); };
  return <main><section className="catalog-page-hero"><PageIntro eyebrow="The closet / sample inventory" title={<>Pieces for your <em>next move.</em></>} body="Explore professional pieces by occasion, size, and availability. The sample collection includes 2–3 options in every category for each occasion. Some pieces work across multiple events." /><div className="catalog-note"><span className="availability-dot" /> <span>Illustrative availability<br /><small>Prototype data for demonstration</small></span></div></section><section className="catalog-section"><div className="catalog-toolbar"><div className="filter-intro"><Filter size={16} /> Refine the closet</div><label className="catalog-search"><Search size={15} /><span className="sr-only">Search clothing</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pieces" /></label><label><span className="sr-only">Occasion</span><select value={activeFilters.occasion} onChange={(event) => setOccasion(event.target.value)}><option>All occasions</option>{occasions.map((item) => <option key={item.name}>{item.name}</option>)}</select><ChevronDown size={15} /></label><label><span className="sr-only">Category</span><select value={activeFilters.category} onChange={(event) => actions.setFilters((current) => ({ ...current, category: event.target.value }))}><option>All</option>{Array.from(new Set(inventory.map((item) => item.category))).map((category) => <option key={category}>{category}</option>)}</select><ChevronDown size={15} /></label><label><span className="sr-only">Size</span><select value={activeFilters.size} onChange={(event) => actions.setFilters((current) => ({ ...current, size: event.target.value }))}><option>All sizes</option>{['XS', 'S', 'M', 'L', 'XL', '6', '7', '8', '9', '10', '11', 'One size'].map((size) => <option key={size}>{size}</option>)}</select><ChevronDown size={15} /></label><label><span className="sr-only">Availability</span><select value={activeFilters.availability} onChange={(event) => actions.setFilters((current) => ({ ...current, availability: event.target.value }))}><option>Available now</option><option>All items</option></select><ChevronDown size={15} /></label></div><div className="catalog-grid">{filteredItems.map((item) => <article className="product-card" key={item.id}><button className="product-image" onClick={() => setSelectedItem(item)} aria-label={`View details for ${item.name}`}><img src={item.image} alt={item.alt} /><span className="product-tag">{item.category}</span><span className="product-zoom"><ExternalLink size={15} /></span></button><div className="product-info"><div><h3>{item.name}</h3><p>{item.color} · {item.sizes.join(', ')}</p></div><button className="heart-button" onClick={() => actions.toggleSaved(item.id)} aria-label={`${state.savedIds.includes(item.id) ? 'Unsave' : 'Save'} ${item.name}`}><Heart size={18} fill={state.savedIds.includes(item.id) ? 'currentColor' : 'none'} /></button></div><div className="product-meta"><span><span className="availability-dot" /> {item.available} available</span><button className="add-link" onClick={() => actions.addToOutfit(item)}>Add to outfit <Plus size={15} /></button></div></article>)}</div>{filteredItems.length === 0 && <div className="empty-state"><Tag size={24} /><h3>No pieces match those filters.</h3><p>Try another size or occasion to see more of the sample closet.</p></div>}<div className="catalog-footer"><span>Showing {filteredItems.length} of {inventory.length} pieces</span><span>All item counts and photographs are illustrative.</span></div></section>{selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} onAdd={actions.addToOutfit} />}</main>;
}

function ItemModal({ item, onClose, onAdd }: { item: Item; onClose: () => void; onAdd: (item: Item) => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="item-modal" role="dialog" aria-modal="true" aria-labelledby="item-modal-title"><button className="modal-close" onClick={onClose} aria-label="Close item details"><X size={20} /></button><img src={item.image} alt={item.alt} /><div className="item-modal-copy"><span className="product-tag">{item.category}</span><h2 id="item-modal-title">{item.name}</h2><p>{item.description}</p><div className="modal-specs"><div><span>Color</span><strong>{item.color}</strong></div><div><span>Sizes</span><strong>{item.sizes.join(' · ')}</strong></div><div><span>Suitable for</span><strong>{item.occasions.slice(0, 3).join(' · ')}</strong></div><div><span>Availability</span><strong className="available-text"><span className="availability-dot" /> {item.available} available</strong></div></div><button className="button button-dark full-button" onClick={() => onAdd(item)}>Add to outfit <Plus size={17} /></button></div></div></div>;
}

function BuilderPage({ state, actions }: { state: AppState; actions: AppActions }) {
  const outfitItems = Object.values(state.outfit).filter((item): item is Item => Boolean(item));
  const slots: GarmentSlot[] = ['blazer', 'top', 'bottom', 'shoes', 'accessory'];
  return <main><section className="builder-page-hero"><PageIntro eyebrow="The outfit builder" title={<>Make the look <em>yours.</em></>} body="Start with a recommendation or choose every piece yourself. There is no wrong way to show up." dark /><div className="builder-occasion"><span>Building for</span><select value={state.activeOccasion} onChange={(event) => actions.buildRecommendedLook(event.target.value as Occasion)} aria-label="Building for occasion">{occasions.map((item) => <option key={item.name}>{item.name}</option>)}</select></div></section><section className="builder-section builder-page-section"><div className="builder-layout"><div className="builder-slots">{slots.map((slot, index) => { const item = state.outfit[slot]; return <div className={`builder-slot ${item ? 'has-item' : ''}`} key={slot}><div className="slot-number">{String(index + 1).padStart(2, '0')}</div>{item ? <><img src={item.image} alt={item.alt} /><div className="slot-detail"><span>{slotLabels[slot]}</span><strong>{item.name}</strong><small>{item.color}</small><label className="builder-size">Size <select value={state.selectedSizes[item.id] ?? item.sizes[0]} onChange={(event) => actions.setSelectedSize(item.id, event.target.value)}>{item.sizes.map((size) => <option key={size}>{size}</option>)}</select></label></div><button className="remove-slot" onClick={() => actions.removeFromOutfit(slot)} aria-label={`Remove ${item.name}`}><X size={15} /></button></> : <div className="empty-slot"><span>{slotLabels[slot]}</span><Link to="/browse">Choose a piece <ArrowRight size={14} /></Link></div>}</div>; })}</div><aside className="outfit-summary"><div className="summary-label"><span className="summary-dot" /> YOUR OUTFIT</div><h3>{outfitItems.length === 0 ? 'A blank canvas.' : `${outfitItems.length} pieces, one complete look.`}</h3><p>{outfitItems.length === 0 ? 'Add pieces from the closet to start building a look that feels ready for the room.' : 'Your selections are saved for this demo. Check your sizes, then reserve the complete look.'}</p><div className="summary-progress"><span style={{ width: `${Math.min(outfitItems.length / 4, 1) * 100}%` }} /></div><span className="summary-count">{outfitItems.length} of 4 essentials selected</span><Link className={`button button-coral reserve-button ${outfitItems.length === 0 ? 'is-disabled' : ''}`} to={outfitItems.length === 0 ? '/browse' : '/reservation'}>Reserve complete outfit <ArrowRight size={17} /></Link><button className="clear-button" onClick={actions.clearOutfit}>Clear selections</button></aside></div></section><section className="builder-next"><Link className="text-button" to="/guide">Need inspiration? Visit the outfit guide <ArrowRight size={16} /></Link></section></main>;
}

function GuidePage({ actions }: { actions: AppActions }) {
  return <main><section className="guide-page-hero"><PageIntro eyebrow="A little guidance goes a long way" title={<>Dress for the room.<br /><em>Show up as yourself.</em></>} body="There is no single right way to look professional. These starting points are here to make getting dressed feel less complicated." /></section><section className="guide-section guide-page-section"><div className="guide-grid">{guideCards.map((card) => <article className="guide-card" key={card.title}><div className="guide-image"><img src={card.image} alt={`${card.title} outfit inspiration`} /><span>{card.kicker}</span></div><div className="guide-card-body"><h3>{card.title}</h3><p>{card.body}</p><div className="guide-look"><span>Try this look</span><strong>{card.look}</strong></div><button className="text-button" onClick={() => actions.buildRecommendedLook(card.title as Occasion)}>Build this look <ArrowRight size={16} /></button></div></article>)}</div></section></main>;
}

function ReservationPage({ state, actions }: { state: AppState; actions: AppActions }) {
  const [step, setStep] = useState(1);
  const outfitItems = Object.values(state.outfit).filter((item): item is Item => Boolean(item));
  const continueStep = () => { if (outfitItems.length === 0) return; if (step === 5) actions.confirmReservation(); else setStep((current) => current + 1); };
  return <main><section className="reservation-page"><PageIntro eyebrow="Reserve your look / demo" title={<>Ready to make it <em>official?</em></>} body="Just a few details. No account, payment, or real student information needed." /><div className="reservation-card"><div className="stepper">{['Review', 'Sizes', 'Pickup', 'Instructions', 'Confirm'].map((label, index) => <div className={`step ${step >= index + 1 ? 'is-active' : ''}`} key={label}><span>{index + 1}</span><small>{label}</small></div>)}</div><div className="reservation-body">{step === 1 && <div className="review-step"><div className="review-outfit">{outfitItems.length ? outfitItems.map((item) => <div className="review-item" key={item.id}><img src={item.image} alt="" /><span>{item.name}</span></div>) : <p>Choose at least one item in the closet before reserving.</p>}</div>{outfitItems.length === 0 && <Link className="text-button" to="/browse">Browse clothing <ArrowRight size={16} /></Link>}<div className="demo-callout"><Sparkles size={17} /><span>This is a clickable prototype. No real reservation is being placed.</span></div></div>}{step === 2 && <div className="form-step"><h3>Confirm your sample sizes</h3><p>These are starting points you can adjust at pickup.</p>{outfitItems.map((item) => <label className="size-row" key={item.id}><span>{item.name}</span><select value={state.selectedSizes[item.id] ?? item.sizes[0]} onChange={(event) => actions.setSelectedSize(item.id, event.target.value)} aria-label={`Size for ${item.name}`}>{item.sizes.map((size) => <option key={size}>{size}</option>)}</select></label>)}</div>}{step === 3 && <div className="form-step"><h3>Choose a sample pickup time</h3><p>Select a window that works for your presentation demo.</p><label className="field-label">Date<select value={state.pickupDate} onChange={(event) => actions.setPickupDate(event.target.value)}><option>Thursday, November 12</option><option>Friday, November 13</option><option>Monday, November 16</option></select></label><label className="field-label">Time<select value={state.pickupTime} onChange={(event) => actions.setPickupTime(event.target.value)}><option>2:30 PM – 3:00 PM</option><option>3:00 PM – 3:30 PM</option><option>4:00 PM – 4:30 PM</option></select></label></div>}{step === 4 && <div className="instructions-step"><h3>Pickup and return, at a glance</h3><div className="instruction-row"><Clock3 size={20} /><div><strong>When you arrive</strong><span>Show the QR code from your confirmation to the Career Closet team.</span></div></div><div className="instruction-row"><Shirt size={20} /><div><strong>Try everything on</strong><span>Our team can help you confirm fit before you head out.</span></div></div><div className="instruction-row"><ArrowRight size={20} /><div><strong>After your event</strong><span>Return the pieces so another student can use them next.</span></div></div></div>}{step === 5 && <div className="final-review"><div className="final-check"><Check size={22} /></div><h3>Everything looks good.</h3><p>{state.pickupDate}<br />{state.pickupTime}</p><div className="mini-id">A unique demo ID will be created when you confirm.</div></div>}</div><div className="reservation-actions">{step > 1 && <button className="text-button" onClick={() => setStep((current) => current - 1)}><ArrowRight size={16} className="rotate-180" /> Back</button>}<button className="button button-dark" disabled={outfitItems.length === 0} onClick={continueStep}>{step === 5 ? 'Confirm reservation' : 'Continue'} <ArrowRight size={17} /></button></div></div></section></main>;
}

function ConfirmationPage({ state }: { state: AppState }) {
  const reservation = loadDemoReservations().find((entry) => entry.id === state.currentReservationId);
  if (!reservation) return <main><section className="confirmation-page"><div className="confirmation-view"><h1>No reservation yet.</h1><p>Choose an outfit and finish the demo checkout to create your QR code.</p><Link className="button button-dark" to="/browse">Browse the closet <ArrowRight size={16} /></Link></div></section></main>;
  const outfitItems = reservation.itemIds.map((id) => inventory.find((item) => item.id === id)).filter((item): item is Item => Boolean(item));
  return <main><section className="confirmation-page"><div className="confirmation-view"><div className="success-icon"><Check size={28} /></div><p className="eyebrow">Reservation confirmed / demo</p><h1>You’re <em>reserved.</em></h1><p className="confirmation-lede">Your sample outfit is ready for pickup. Keep this code: staff can type it in, or scan your QR to open the same record.</p><div className="confirmation-layout"><div className="confirmation-qr"><QRCodeSVG value={qrStaffUrl(reservation)} size={248} bgColor="#ffffff" fgColor="#112844" includeMargin /><span>Scan to open staff lookup</span></div><div className="confirmation-details"><div className="confirm-id"><span>Reservation ID</span><strong>{reservation.id}</strong></div><div><span>Pickup</span><strong>{reservation.pickupDate}<br />{reservation.pickupTime}</strong></div><div><span>Location</span><strong>Proposed Career Closet check-in</strong></div><div><span>Return</span><strong>Bring items back after your event.</strong></div></div></div><div className="confirmation-items">{outfitItems.map((item) => <span key={item.id}><Check size={14} /> {item.name} · {reservation.sizes[item.id] ?? item.sizes[0]}</span>)}</div><div className="confirmation-demo-tip"><strong>Two ways to check in</strong><span>Staff can enter <b>{reservation.id}</b> manually, or scan this QR code to load the same demonstration reservation.</span></div><Link className="button button-dark full-button" to="/staff">Open staff code-entry demo <ArrowRight size={17} /></Link></div></section></main>;
}

function StaffPage({ actions }: { state: AppState; actions: AppActions }) {
  const [searchParams] = useSearchParams();
  const scannedId = searchParams.get('id');
  const scannedPayload = searchParams.get('demo');
  const [entry, setEntry] = useState(scannedId ?? '');
  const [lookupId, setLookupId] = useState(scannedId?.trim().toUpperCase() ?? '');
  const [didLookup, setDidLookup] = useState(Boolean(scannedId));
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!scannedId) return;
    const imported = scannedPayload ? decodeDemoReservation(scannedPayload) : null;
    if (imported && imported.id === scannedId.trim().toUpperCase()) {
      const previous = loadDemoReservations();
      // Do not reset a reservation that staff have already marked picked up.
      if (!previous.some((item) => item.id === imported.id)) {
        saveDemoReservations([imported, ...previous]);
      }
    }
    setEntry(scannedId);
    setLookupId(scannedId.trim().toUpperCase());
    setDidLookup(true);
    setVersion((current) => current + 1);
  }, [scannedId, scannedPayload]);

  const reservation = useMemo(() => lookupId ? loadDemoReservations().find((item) => item.id === lookupId) : undefined, [lookupId, version]);
  const reservedItems = reservation ? reservation.itemIds.map((id) => inventory.find((item) => item.id === id)).filter((item): item is Item => Boolean(item)) : [];
  const submitLookup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = entry.trim().toUpperCase();
    setLookupId(normalized);
    setDidLookup(true);
    setVersion((current) => current + 1);
  };
  const markPickedUp = () => {
    if (!reservation) return;
    saveDemoReservations(loadDemoReservations().map((item) => item.id === reservation.id ? { ...item, status: 'Picked up' } : item));
    actions.setPickedUp(true);
    setVersion((current) => current + 1);
  };
  return <main><section className="staff-page"><PageIntro eyebrow="Behind the counter / demo mode" title={<>Pickup, made <em>simple.</em></>} body="Enter the student's reservation code to look up their items. Scanning their QR code opens this same lookup automatically." /><div className="staff-status"><span className="availability-dot" /> Staff check-in</div><form className="staff-lookup" onSubmit={submitLookup}><ScanLine size={24} /><label htmlFor="reservation-lookup"><span>Enter reservation code</span><input id="reservation-lookup" value={entry} onChange={(event) => setEntry(event.target.value)} placeholder="e.g. CC-ABC123" autoComplete="off" spellCheck={false} /></label><button className="button button-dark" type="submit" disabled={!entry.trim()}>Look up <ArrowRight size={16} /></button></form><p className="staff-method-note">Manual entry searches demo reservations in this browser; the QR opens that lookup and can carry sample details to another device. <strong>Demo only:</strong> no real student records or inventory.</p>{reservation ? <div className="staff-ticket"><div className="ticket-main"><div className="ticket-top"><span className="ticket-label">RESERVATION FOUND</span><span className="ticket-id">{reservation.id}</span></div><div className="ticket-student"><div className="student-avatar"><UserRound size={21} /></div><div><span>Student pickup</span><strong>{reservation.status === 'Picked up' ? 'Picked up' : 'Ready for pickup'}</strong></div></div><div className="ticket-details"><div><span>Pickup window</span><strong>{reservation.pickupDate} · {reservation.pickupTime}</strong></div><div><span>Items</span><strong>{reservedItems.length} pieces selected</strong></div><div><span>Status</span><strong>{reservation.status}</strong></div></div><div className="staff-item-list">{reservedItems.map((item) => <div key={item.id}><Check size={15} /><span>{item.name}</span><strong>Size {reservation.sizes[item.id] ?? item.sizes[0]}</strong></div>)}</div>{reservation.status === 'Picked up' ? <div className="picked-banner"><Check size={18} /> Marked as picked up for this demo</div> : <button className="button button-dark" onClick={markPickedUp}><ScanLine size={17} /> Mark as picked up</button>}</div><div className="ticket-qr"><div className="qr-frame"><QRCodeSVG value={qrStaffUrl(reservation)} size={160} bgColor="#ffffff" fgColor="#112844" includeMargin /></div><span>Same reservation QR</span></div></div> : <div className="staff-empty"><Tag size={22} /><h3>{didLookup && lookupId ? 'Reservation not found.' : 'Enter a reservation code.'}</h3><p>{didLookup && lookupId ? 'Check the code and try again. Reservations created on this browser can be entered manually; scanning the QR can also bring sample details to another device.' : 'Create a demo reservation, return here, and type the code shown on its confirmation. Or scan its QR to look it up automatically.'}</p></div>}</section></main>;
}

export default function RoutedApp() {
  return <HashRouter><App /></HashRouter>;
}
