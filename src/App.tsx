import { createContext, FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { adminUsers, events, galleryAlbums, historyText, members, news, repertoire, siteSettings, socialLinks, sponsors, timeline } from './data/siteData';
import { fetchPublicData, isSupabaseConfigured, type PublicData } from './lib/supabase';

const initialPublicData: PublicData = {
  source: 'local',
  siteSettings,
  socialLinks,
  events,
  news,
  repertoire,
  galleryAlbums,
  members,
  sponsors,
  timeline,
};

const PublicDataContext = createContext<PublicData>(initialPublicData);

function usePublicData() {
  return useContext(PublicDataContext);
}

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/historia', label: 'Historia' },
  { to: '/repertorio', label: 'Repertorio' },
  { to: '/actuaciones', label: 'Actuaciones' },
  { to: '/galeria', label: 'Galería' },
  { to: '/componentes', label: 'Componentes' },
  { to: '/patrocinadores', label: 'Patrocinadores' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/admin', label: 'Admin' },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [publicData, setPublicData] = useState(initialPublicData);
  const [connectionError, setConnectionError] = useState('');
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    let isMounted = true;

    fetchPublicData()
      .then((data) => {
        if (isMounted) setPublicData(data);
      })
      .catch((error: unknown) => {
        console.error('No se pudieron cargar los datos públicos:', error);
        if (isMounted) {
          setConnectionError(error instanceof Error ? error.message : 'Error desconocido al conectar con Supabase.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PublicDataContext.Provider value={publicData}>
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Inicio de la Agrupación Musical Virgen de la Soledad">
            <img src="/escudoAM.png" alt="Escudo de la Agrupación Musical Virgen de la Soledad" className="brand-logo" />
            <div>
              <span className="brand-name">AM VS</span>
              <small>{publicData.siteSettings.name}</small>
            </div>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
          >
            ☰
          </button>

          <nav className={`site-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Menú principal">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="page-shell">
        {isLoading ? <p className="connection-banner" role="status">Conectando con Supabase…</p> : null}
        {connectionError ? <p className="connection-banner error-text" role="alert">{connectionError} Se mantienen los datos locales de respaldo.</p> : null}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/historia" element={<HistoryPage />} />
          <Route path="/repertorio" element={<RepertoirePage />} />
          <Route path="/actuaciones" element={<EventsPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/componentes" element={<MembersPage />} />
          <Route path="/patrocinadores" element={<SponsorsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>{publicData.siteSettings.siglas}</h3>
            <p>{publicData.siteSettings.name}</p>
            <p>{publicData.siteSettings.locality}</p>
          </div>
          <div>
            <h4>Contacto</h4>
            <p>{publicData.siteSettings.publicPhone}</p>
            <p>{publicData.siteSettings.rehearsalAddress}</p>
          </div>
          <div>
            <h4>Redes</h4>
            <ul className="footer-links">
              {publicData.socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.url} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
    </PublicDataContext.Provider>
  );
}

function HomePage() {
  const { siteSettings: settings, news: publishedNews } = usePublicData();
  const facts = [
    { label: 'Año de fundación', value: String(settings.foundationYear) },
    { label: 'Director actual', value: settings.currentDirector },
    { label: 'Localidad', value: 'Doña Mencía' },
    { label: 'Valores', value: settings.values.join(', ') },
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Agrupación Musical</span>
            <h1>Virgen de la Soledad de Doña Mencía</h1>
            <p>
              Tradición, juventud y devoción para la música cofrade de la localidad. La AM VS conserva la esencia de la Semana Santa en Doña Mencía.
            </p>
            <div className="hero-actions">
              <Link to="/historia" className="button primary">
                Nuestra historia
              </Link>
              <Link to="/contacto" className="button secondary">
                Solicitar contratación
              </Link>
            </div>
          </div>
          <div className="hero-panel">
            <img src="/escudoAM.png" alt="Escudo de la Agrupación Musical Virgen de la Soledad" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Identidad</span>
            <h2>Valores de la agrupación</h2>
          </div>
          <div className="card-grid three-col">
            {settings.values.map((value) => (
              <article key={value} className="feature-card">
                <div className="feature-icon">✦</div>
                <h3>{value}</h3>
                <p>Base espiritual, musical y cultural que guía la identidad de la AM VS.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Datos</span>
            <h2>Información oficial</h2>
          </div>
          <div className="stats-grid">
            {facts.map((fact) => (
              <div key={fact.label} className="stat-card">
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Actuación habitual</span>
              <h2>Sábado de Gloria</h2>
            </div>
            <Link to="/actuaciones" className="button secondary text-button">
              Ver todas las actuaciones
            </Link>
          </div>
          <div className="feature-banner">
            <div>
              <h3>Actuación habitual en Doña Mencía</h3>
              <p>La agrupación mantiene como cita tradicional la participación en el Sábado de Gloria en Doña Mencía, con su presencia en la localidad y sus actos cofrades.</p>
            </div>
            <span className="badge success">Celebrada</span>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Actualidad</span>
            <h2>Últimas noticias</h2>
          </div>
          {publishedNews.length === 0 ? (
            <div className="empty-state">
              <p>En este momento no hay noticias publicadas. El contenido informativo se incorporará desde el panel privado cuando sea necesario.</p>
            </div>
          ) : (
            <div className="card-grid three-col">
              {publishedNews.slice(0, 3).map((item) => (
                <article key={item.id} className="feature-card">
                  <span className="card-tag">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function HistoryPage() {
  const { timeline: historyTimeline } = usePublicData();

  return (
    <div className="container section-page">
      <PageHeader title="Historia" subtitle="Trayectoria y evolución de la Agrupación Musical Virgen de la Soledad" />
      <div className="story-block">
        <p>{historyText}</p>
      </div>
      <div className="timeline">
        {historyTimeline.map((item) => (
          <article key={item.id} className="timeline-item">
            <span className="timeline-year">{item.year}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function RepertoirePage() {
  const { repertoire: repertoireItems } = usePublicData();

  return (
    <div className="container section-page">
      <PageHeader title="Repertorio" subtitle="Composiciones y marchas de la agrupación" />
      {repertoireItems.length === 0 ? (
        <div className="empty-state large">
          <p>El repertorio se actualizará próximamente.</p>
        </div>
      ) : (
        <div className="card-grid four-col">
          {repertoireItems.map((item) => (
            <article key={item.id} className="repertoire-card">
              <span className="card-tag">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.author}</p>
              {item.description ? <small>{item.description}</small> : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function EventsPage() {
  const { events: eventItems } = usePublicData();
  const orderedEvents = useMemo(
    () => [...eventItems].sort((a, b) => a.title.localeCompare(b.title)),
    [eventItems],
  );

  return (
    <div className="container section-page">
      <PageHeader title="Actuaciones" subtitle="Listado gestionable por el administrador" />
      {orderedEvents.length === 0 ? (
        <div className="empty-state large">
          <p>Próximamente se anunciarán nuevas actuaciones.</p>
        </div>
      ) : (
        <div className="card-grid two-col">
          {orderedEvents.map((event) => (
            <article key={event.id} className="event-card">
              <div className="event-card-header">
                <h3>{event.title}</h3>
                <span className={`badge ${event.status}`}>{event.status}</span>
              </div>
              <p>{event.description}</p>
              <ul className="event-meta">
                <li>Tipo: {event.type}</li>
                <li>Localidad: {event.location}</li>
                <li>Fecha: {event.dateLabel}</li>
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryPage() {
  const { galleryAlbums: albums } = usePublicData();
  const hasGallery = albums.length > 0;

  return (
    <div className="container section-page">
      <PageHeader title="Galería" subtitle="Álbumes, fotografías, vídeos y publicaciones" />
      {!hasGallery ? (
        <div className="empty-state large">
          <p>Estamos preparando nuevas imágenes, álbumes y publicaciones para la galería. El contenido se gestionará desde el panel privado.</p>
        </div>
      ) : (
        <div className="card-grid three-col">
          {albums.map((album) => (
            <article key={album.id} className="gallery-card">
              <div className="gallery-cover" aria-label={`Imagen de ${album.title}`} />
              <div className="gallery-body">
                <span className="card-tag">{album.category}</span>
                <h3>{album.title}</h3>
                <p>{album.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function MembersPage() {
  const { members: visibleMembers } = usePublicData();
  const hasMembers = visibleMembers.length > 0;

  return (
    <div className="container section-page">
      <PageHeader title="Componentes" subtitle="Listado de la formación musical" />
      {!hasMembers ? (
        <div className="empty-state large">
          <p>La relación de componentes se completará en el futuro. Por el momento, la web presenta una vista general y deja el listado preparado para su gestión.</p>
        </div>
      ) : (
        <div className="card-grid three-col">
          {visibleMembers.map((member) => (
            <article key={member.id} className="member-card">
              <div className="member-avatar" aria-label={member.name} />
              <h3>{member.name}</h3>
              <p>{member.instrument}</p>
              <small>{member.section}</small>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function SponsorsPage() {
  const { sponsors: activeSponsors } = usePublicData();
  const hasSponsors = activeSponsors.length > 0;

  return (
    <div className="container section-page">
      <PageHeader title="Patrocinadores" subtitle="Colaboradores y apoyos de la agrupación" />
      {!hasSponsors ? (
        <div className="empty-state large">
          <p>Se irán incorporando colaboradores y patrocinadores en el panel de administración. No se muestran datos inventados.</p>
        </div>
      ) : (
        <div className="card-grid two-col">
          {activeSponsors.map((sponsor) => (
            <article key={sponsor.name} className="sponsor-card">
              <h3>{sponsor.name}</h3>
              <p>{sponsor.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactPage() {
  const { siteSettings: settings } = usePublicData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    entity: '',
    email: '',
    phone: '',
    locality: '',
    eventDate: '',
    eventType: '',
    message: '',
  });

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) nextErrors.name = 'El nombre es obligatorio.';
    if (!formData.entity.trim()) nextErrors.entity = 'La entidad o cofradía es obligatoria.';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Introduce un correo válido.';
    if (!formData.phone.trim()) nextErrors.phone = 'El teléfono es obligatorio.';
    if (!formData.locality.trim()) nextErrors.locality = 'La localidad es obligatoria.';
    if (!formData.eventDate) nextErrors.eventDate = 'La fecha aproximada es obligatoria.';
    if (!formData.eventType.trim()) nextErrors.eventType = 'Selecciona el tipo de evento.';
    if (formData.message.trim().length < 10) nextErrors.message = 'El mensaje debe tener al menos 10 caracteres.';

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitted(true);
    setFormData({
      name: '',
      entity: '',
      email: '',
      phone: '',
      locality: '',
      eventDate: '',
      eventType: '',
      message: '',
    });
  };

  return (
    <div className="container section-page contact-layout">
      <div>
        <PageHeader title="Contratación y contacto" subtitle="Solicitudes profesionales para actuaciones y eventos" />
        <div className="info-box">
          <p><strong>Teléfono público:</strong> {settings.publicPhone}</p>
          <p><strong>Local de ensayo:</strong> {settings.rehearsalAddress}</p>
          <p><strong>Ubicación:</strong> {settings.locality}</p>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="field-grid">
          <label>
            Nombre
            <input value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} />
            {errors.name ? <small>{errors.name}</small> : null}
          </label>
          <label>
            Entidad o cofradía
            <input value={formData.entity} onChange={(event) => setFormData((current) => ({ ...current, entity: event.target.value }))} />
            {errors.entity ? <small>{errors.entity}</small> : null}
          </label>
          <label>
            Correo electrónico
            <input value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} />
            {errors.email ? <small>{errors.email}</small> : null}
          </label>
          <label>
            Teléfono
            <input value={formData.phone} onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))} />
            {errors.phone ? <small>{errors.phone}</small> : null}
          </label>
          <label>
            Localidad
            <input value={formData.locality} onChange={(event) => setFormData((current) => ({ ...current, locality: event.target.value }))} />
            {errors.locality ? <small>{errors.locality}</small> : null}
          </label>
          <label>
            Fecha aproximada
            <input type="date" value={formData.eventDate} onChange={(event) => setFormData((current) => ({ ...current, eventDate: event.target.value }))} />
            {errors.eventDate ? <small>{errors.eventDate}</small> : null}
          </label>
          <label className="full-width">
            Tipo de evento
            <input value={formData.eventType} onChange={(event) => setFormData((current) => ({ ...current, eventType: event.target.value }))} />
            {errors.eventType ? <small>{errors.eventType}</small> : null}
          </label>
          <label className="full-width">
            Mensaje
            <textarea value={formData.message} onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))} rows={5} />
            {errors.message ? <small>{errors.message}</small> : null}
          </label>
        </div>

        {isSubmitted ? <p className="success-message">Solicitud preparada correctamente. En una implementación con Supabase, esta petición quedará almacenada de forma segura en la tabla correspondiente.</p> : null}

        <button type="submit" className="button primary submit-button">Enviar solicitud</button>
      </form>
    </div>
  );
}

function AdminPage() {
  const publicData = usePublicData();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('amvs-demo-auth') === 'true');

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (credentials.email.includes('@') && credentials.password.length >= 6) {
      localStorage.setItem('amvs-demo-auth', 'true');
      setIsAuthenticated(true);
      setError('');
      return;
    }
    setError('Credenciales de demostración no válidas. Usa un correo válido y una contraseña de 6 o más caracteres.');
  };

  if (!isAuthenticated) {
    return (
      <div className="container section-page admin-login">
        <div className="login-card">
          <h2>Acceso privado</h2>
          <p>El panel administrativo está preparado para Supabase Auth. Esta vista es una demo local para comprobar el flujo del panel.</p>
          <form onSubmit={handleLogin}>
            <label>
              Correo electrónico
              <input type="email" value={credentials.email} onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))} />
            </label>
            <label>
              Contraseña
              <input type="password" value={credentials.password} onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))} />
            </label>
            {error ? <small className="error-text">{error}</small> : null}
            <button type="submit" className="button primary">Entrar al panel</button>
          </form>
          <p className="helper-text">{isSupabaseConfigured ? 'Supabase detectado.' : 'Sin credenciales de Supabase configuradas: el panel funciona en modo de demostración local.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-page admin-panel">
      <PageHeader title="Panel de administración" subtitle="Gestión privada de la web AM VS" />
      <div className="admin-summary">
        <div className="summary-card">
          <span>Noticias</span>
          <strong>{publicData.news.length}</strong>
        </div>
        <div className="summary-card">
          <span>Actuaciones</span>
          <strong>{publicData.events.length}</strong>
        </div>
        <div className="summary-card">
          <span>Repertorio</span>
          <strong>{publicData.repertoire.length}</strong>
        </div>
        <div className="summary-card">
          <span>Usuarios previstos</span>
          <strong>{adminUsers.length}</strong>
        </div>
      </div>

      <div className="admin-grid">
        <article className="admin-card">
          <h3>Gestión de contenidos</h3>
          <ul>
            <li>Noticias</li>
            <li>Actuaciones</li>
            <li>Repertorio</li>
            <li>Galería</li>
            <li>Componentes</li>
            <li>Patrocinadores</li>
          </ul>
        </article>
        <article className="admin-card">
          <h3>Permisos</h3>
          <ul>
            {adminUsers.map((user) => (
              <li key={user.name}>{user.name}: {user.role}</li>
            ))}
          </ul>
        </article>
        <article className="admin-card">
          <h3>Estado operativo</h3>
          <ul>
            <li>Supabase: {isSupabaseConfigured ? 'Configurado' : 'Pendiente de configuración'}</li>
            <li>RLS: Preparado en SQL</li>
            <li>Storage: Preparado en buckets</li>
          </ul>
        </article>
      </div>

      <div className="admin-actions">
        <button type="button" className="button secondary" onClick={() => { localStorage.removeItem('amvs-demo-auth'); setIsAuthenticated(false); }}>Cerrar sesión</button>
      </div>
    </div>
  );
}

function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="container section-page not-found">
      <h1>404</h1>
      <p>No se ha encontrado la ruta <strong>{location.pathname}</strong>.</p>
      <Link to="/" className="button primary">Volver al inicio</Link>
    </div>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="page-header">
      <span className="eyebrow">AM VS</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

export default App;
