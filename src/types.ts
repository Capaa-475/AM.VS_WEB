export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  name: string;
  siglas: string;
  locality: string;
  foundationYear: number;
  currentDirector: string;
  values: string[];
  rehearsalAddress: string;
  publicPhone: string;
  isIndependent: boolean;
};

export type EventStatus = 'celebrada' | 'proxima' | 'cancelada';

export type EventItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: 'Semana Santa' | 'Certámenes' | 'Concierto' | 'Procesión' | 'Especial';
  status: EventStatus;
  dateLabel: string;
};

export type RepertoireItem = {
  id: string;
  title: string;
  author: string;
  category: string;
  year?: number;
  description?: string;
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  status: 'borrador' | 'publicada';
};

export type GalleryAlbum = {
  id: string;
  title: string;
  description: string;
  category: 'Semana Santa' | 'Sábado de Gloria' | 'Certámenes' | 'Conciertos' | 'Ensayos' | 'Eventos especiales';
  date: string;
  coverImage?: string;
};

export type MemberItem = {
  id: string;
  name: string;
  instrument: string;
  section: string;
  role?: string;
  photo?: string;
  visible: boolean;
};

export type SponsorItem = {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  active: boolean;
};

export type TimelineItem = {
  id: string;
  year: string;
  title: string;
  description: string;
  date?: string;
};

export type ContactRequest = {
  name: string;
  entity: string;
  email: string;
  phone: string;
  locality: string;
  eventDate: string;
  eventType: string;
  message: string;
};
