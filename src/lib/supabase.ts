import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  events as fallbackEvents,
  galleryAlbums as fallbackGalleryAlbums,
  members as fallbackMembers,
  news as fallbackNews,
  repertoire as fallbackRepertoire,
  siteSettings as fallbackSettings,
  socialLinks,
  sponsors as fallbackSponsors,
  timeline as fallbackTimeline,
} from '../data/siteData';
import type {
  EventItem,
  GalleryAlbum,
  MemberItem,
  NewsItem,
  RepertoireItem,
  SiteSettings,
  SponsorItem,
  TimelineItem,
} from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);

function text(row: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
  }
  return '';
}

function boolean(row: Record<string, unknown>, ...keys: string[]): boolean {
  for (const key of keys) {
    if (typeof row[key] === 'boolean') return row[key];
  }
  return false;
}

function eventType(value: string): EventItem['type'] {
  if (value === 'Semana Santa' || value === 'Certámenes' || value === 'Concierto' || value === 'Procesión' || value === 'Especial') {
    return value;
  }
  return 'Especial';
}

function mapEvent(row: Record<string, unknown>): EventItem {
  const rawStatus = text(row, 'estado', 'status');
  const status: EventItem['status'] =
    rawStatus === 'celebrada' || rawStatus === 'cancelada' ? rawStatus : 'proxima';
  const date = text(row, 'fecha', 'date');

  return {
    id: text(row, 'id'),
    title: text(row, 'titulo', 'title'),
    description: text(row, 'descripcion', 'description'),
    location: text(row, 'localidad', 'location'),
    type: eventType(text(row, 'tipo', 'type')),
    status,
    dateLabel: date || 'Por anunciar',
  };
}

function mapNews(row: Record<string, unknown>): NewsItem {
  return {
    id: text(row, 'id'),
    title: text(row, 'titulo', 'title'),
    category: text(row, 'categoria', 'category'),
    summary: text(row, 'resumen', 'summary'),
    date: text(row, 'fecha_publicacion', 'fecha_publicación', 'date'),
    status: 'publicada',
  };
}

function mapRepertoire(row: Record<string, unknown>): RepertoireItem {
  const year = row.anio ?? row.año ?? row.year;
  return {
    id: text(row, 'id'),
    title: text(row, 'titulo', 'title'),
    author: text(row, 'autor', 'author'),
    category: text(row, 'categoria', 'category'),
    ...(typeof year === 'number' ? { year } : {}),
    description: text(row, 'descripcion', 'description'),
  };
}

function mapAlbum(row: Record<string, unknown>): GalleryAlbum {
  const category = text(row, 'categoria', 'category');
  const allowedCategories: GalleryAlbum['category'][] = [
    'Semana Santa',
    'Sábado de Gloria',
    'Certámenes',
    'Conciertos',
    'Ensayos',
    'Eventos especiales',
  ];

  return {
    id: text(row, 'id'),
    title: text(row, 'titulo', 'title'),
    description: text(row, 'descripcion', 'description'),
    category: allowedCategories.includes(category as GalleryAlbum['category'])
      ? (category as GalleryAlbum['category'])
      : 'Semana Santa',
    date: text(row, 'fecha', 'date'),
    coverImage: text(row, 'portada', 'coverImage') || undefined,
  };
}

function mapMember(row: Record<string, unknown>): MemberItem {
  return {
    id: text(row, 'id'),
    name: text(row, 'nombre', 'name'),
    instrument: text(row, 'instrumento', 'instrument'),
    section: text(row, 'seccion', 'section'),
    role: text(row, 'cargo', 'role') || undefined,
    photo: text(row, 'fotografia', 'photo') || undefined,
    visible: boolean(row, 'visible'),
  };
}

function mapSponsor(row: Record<string, unknown>): SponsorItem {
  return {
    id: text(row, 'id'),
    name: text(row, 'nombre', 'name'),
    description: text(row, 'descripcion', 'description') || undefined,
    logo: text(row, 'logotipo', 'logo') || undefined,
    website: text(row, 'enlace', 'website') || undefined,
    active: boolean(row, 'activo', 'active'),
  };
}

function mapTimeline(row: Record<string, unknown>): TimelineItem {
  return {
    id: text(row, 'id'),
    year: text(row, 'anio', 'año', 'year'),
    title: text(row, 'titulo', 'title'),
    description: text(row, 'descripcion', 'description'),
    date: text(row, 'fecha', 'date') || undefined,
  };
}

export async function fetchPublicData() {
  if (!supabase) {
    return {
      source: 'local' as const,
      siteSettings: fallbackSettings,
      socialLinks,
      events: fallbackEvents,
      news: fallbackNews,
      repertoire: fallbackRepertoire,
      galleryAlbums: fallbackGalleryAlbums,
      members: fallbackMembers,
      sponsors: fallbackSponsors,
      timeline: fallbackTimeline,
    };
  }

  const [
    eventsResponse,
    newsResponse,
    repertoireResponse,
    galleryResponse,
    membersResponse,
    sponsorsResponse,
    timelineResponse,
    settingsResponse,
  ] = await Promise.all([
    supabase.from('events').select('*').order('fecha', { ascending: true }),
    supabase.from('news').select('*').eq('estado', 'publicada').order('fecha_publicacion', { ascending: false }),
    supabase.from('repertoire').select('*').order('titulo', { ascending: true }),
    supabase.from('gallery_albums').select('*').order('fecha', { ascending: false }),
    supabase.from('members').select('*').eq('visible', true).order('orden', { ascending: true }),
    supabase.from('sponsors').select('*').eq('activo', true).order('orden', { ascending: true }),
    supabase.from('timeline').select('*').order('orden', { ascending: true }),
    supabase.from('site_settings').select('clave, valor'),
  ]);

  const responses = [
    eventsResponse,
    newsResponse,
    repertoireResponse,
    galleryResponse,
    membersResponse,
    sponsorsResponse,
    timelineResponse,
    settingsResponse,
  ];
  const failedResponse = responses.find((response) => response.error);
  if (failedResponse?.error) {
    throw new Error(`No se pudieron leer los datos públicos de Supabase: ${failedResponse.error.message}`);
  }

  const settingRows = (settingsResponse.data ?? []) as Array<Record<string, unknown>>;
  const settings = new Map(settingRows.map((row) => [text(row, 'clave'), text(row, 'valor')]));
  const siteSettings: SiteSettings = {
    ...fallbackSettings,
    name: settings.get('site_name') || fallbackSettings.name,
    siglas: settings.get('site_siglas') || fallbackSettings.siglas,
    currentDirector: settings.get('site_director') || fallbackSettings.currentDirector,
    locality: settings.get('site_locality') || fallbackSettings.locality,
    publicPhone: settings.get('site_phone') || fallbackSettings.publicPhone,
    rehearsalAddress: settings.get('site_rehearsal_address') || fallbackSettings.rehearsalAddress,
    values: settings.get('site_values')?.split(';').filter(Boolean) || fallbackSettings.values,
  };

  return {
    source: 'supabase' as const,
    siteSettings,
    socialLinks,
    events: ((eventsResponse.data ?? []) as Array<Record<string, unknown>>).map(mapEvent),
    news: ((newsResponse.data ?? []) as Array<Record<string, unknown>>).map(mapNews),
    repertoire: ((repertoireResponse.data ?? []) as Array<Record<string, unknown>>).map(mapRepertoire),
    galleryAlbums: ((galleryResponse.data ?? []) as Array<Record<string, unknown>>).map(mapAlbum),
    members: ((membersResponse.data ?? []) as Array<Record<string, unknown>>).map(mapMember),
    sponsors: ((sponsorsResponse.data ?? []) as Array<Record<string, unknown>>).map(mapSponsor),
    timeline: ((timelineResponse.data ?? []) as Array<Record<string, unknown>>).map(mapTimeline),
  };
}

export type PublicData = Awaited<ReturnType<typeof fetchPublicData>>;
