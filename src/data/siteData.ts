import type { EventItem, GalleryAlbum, MemberItem, NewsItem, RepertoireItem, SiteSettings, SocialLink, SponsorItem, TimelineItem } from '../types';

export const siteSettings: SiteSettings = {
  name: 'Agrupación Musical Virgen de la Soledad de Doña Mencía',
  siglas: 'AM VS',
  locality: 'Doña Mencía, Córdoba, Andalucía, España',
  foundationYear: 2008,
  currentDirector: 'Pedro López',
  values: ['Tradición', 'Juventud', 'Devoción'],
  rehearsalAddress: 'Cerca de C. el Jardinito, 13, 14860 Doña Mencía, Córdoba',
  publicPhone: '+34 699 14 26 01',
  isIndependent: true,
};

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', url: 'https://www.instagram.com/amvirgensoledad' },
  { label: 'YouTube', url: 'https://youtube.com/@amvirgendelasoledaddonamencia' },
  { label: 'Facebook', url: 'https://www.facebook.com/amvirgen.delasoledad' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@amvirgendelasoledad' },
];

export const historyText = `A finales de la Semana Santa de 2008 surgió la idea de crear una agrupación musical a partir de la antigua banda de la Cofradía de Nuestra Señora de la Soledad y Esperanza de Doña Mencía. Durante mayo de 2008 se celebraron reuniones entre antiguos componentes de aquella banda y otras personas interesadas en formar parte del nuevo proyecto. La cofradía colaboró donando buena parte de los instrumentos y antiguos uniformes, entre ellos instrumentos de viento conocidos como gaitas. La nueva agrupación tomó el nombre de su titular. La compra de otros instrumentos se financió mediante aportaciones personales de colaboradores. El Ayuntamiento de Doña Mencía ayudó facilitando un espacio para los ensayos. En verano de 2008 se incorporó como director musical Manolo Luque, director de la A.M. Nuestro Padre Jesús de la Redención, de la Hermandad de la Estrella de Córdoba. Comenzaron las clases de solfeo y los primeros ensayos. En la Cuaresma posterior, la agrupación realizó sus primeras actuaciones con seis marchas. Participó en el I Certamen de Bandas Mencianas Maestro Pelayo y en actos relacionados con la titular de la cofradía. Su primera salida procesional tuvo lugar el Sábado de Gloria, acompañando a la cruz guía de la Cofradía de Nuestra Señora de la Soledad y Esperanza. Posteriormente se produjo un cambio de dirección musical, incorporándose Diego Écija Alba, de Cabra. Se renovaron instrumentos y repertorio, incluyendo cambios importantes en la formación musical. El 21 de febrero de 2010 tuvo lugar el padrinazgo por parte de la A.M. Nuestro Padre Jesús de los Afligidos, de Puente Genil. En 2010 participó en diferentes certámenes y actos musicales de la localidad, además de actuaciones en Cuevas de San Marcos y Doña Mencía.`;

export const timeline: TimelineItem[] = [
  {
    id: '2008-idea',
    year: '2008',
    title: 'Nacimiento de la agrupación',
    description: 'Se crea la idea de formar una nueva agrupación musical a partir de la antigua banda de la Cofradía de Nuestra Señora de la Soledad y Esperanza.',
  },
  {
    id: '2008-primeros-ensayos',
    year: '2008',
    title: 'Primeros ensayos y primeras actuaciones',
    description: 'Con la dirección de Manolo Luque comienzan clases de solfeo, ensayos y actuaciones con seis marchas.',
  },
  {
    id: '2008-sabado-gloria',
    year: '2008',
    title: 'Primera salida procesional',
    description: 'La agrupación acompaña a la cruz guía de la Cofradía de Nuestra Señora de la Soledad y Esperanza en el Sábado de Gloria.',
  },
  {
    id: '2010-padrinazgo',
    year: '2010',
    title: 'Padrinazgo y expansión',
    description: 'El 21 de febrero de 2010 tuvo lugar el padrinazgo por parte de la A.M. Nuestro Padre Jesús de los Afligidos, de Puente Genil.',
  },
];

export const repertoire: RepertoireItem[] = [
  { id: 'suena-la-soledad', title: 'Suena la Soledad', author: 'Director', category: 'Marcha', description: 'Marcha de paso ordinario compuesta por el director.' },
  { id: 'candela', title: 'Candela', author: 'Director', category: 'Composición', description: 'Composición realizada por el director para su hija.' },
  { id: 'himno-nacional', title: 'Himno Nacional de España', author: 'Tradicional', category: 'Himno' },
  { id: 'en-la-cena-del-senor', title: 'En la cena del Señor', author: 'Tradicional', category: 'Marcha' },
  { id: 'soledad-menciana', title: 'Soledad Menciana', author: 'Tradicional', category: 'Marcha' },
  { id: 'reina-de-reyes', title: 'Reina de Reyes', author: 'Tradicional', category: 'Marcha' },
  { id: 'virgen-de-la-paz', title: 'Virgen de la Paz', author: 'Tradicional', category: 'Marcha' },
  { id: 'estrella-menciana', title: 'Estrella Menciana', author: 'Tradicional', category: 'Marcha' },
];

export const events: EventItem[] = [
  {
    id: 'sabado-gloria',
    title: 'Sábado de Gloria',
    description: 'Actuación habitual de la agrupación en Doña Mencía.',
    location: 'Doña Mencía',
    type: 'Procesión',
    status: 'celebrada',
    dateLabel: 'Anual',
  },
  {
    id: 'certamenes-cuaresma',
    title: 'Certámenes de Cuaresma',
    description: 'Participación en certámenes y actos de Cuaresma.',
    location: 'Doña Mencía',
    type: 'Certámenes',
    status: 'proxima',
    dateLabel: 'Por anunciar',
  },
  {
    id: 'concierto-maestro-pelayo',
    title: 'Concierto Maestro Pelayo',
    description: 'Concierto de referencia de la formación.',
    location: 'Doña Mencía',
    type: 'Concierto',
    status: 'proxima',
    dateLabel: 'Por anunciar',
  },
];

export const news: NewsItem[] = [];

export const galleryAlbums: GalleryAlbum[] = [];

export const members: MemberItem[] = [];

export const sponsors: SponsorItem[] = [];

export const quickFacts = [
  { label: 'Año de fundación', value: '2008' },
  { label: 'Director actual', value: 'Pedro López' },
  { label: 'Localidad', value: 'Doña Mencía' },
  { label: 'Valores', value: 'Tradición, juventud y devoción' },
];

export const adminUsers = [
  { name: 'Francis', role: 'Superadministrador' },
  { name: 'Sara', role: 'Administrador' },
  { name: 'Pedro', role: 'Administrador' },
  { name: 'Sergio', role: 'Editor' },
];
