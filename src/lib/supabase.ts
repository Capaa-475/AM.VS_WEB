import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { events, galleryAlbums, members, news, repertoire, siteSettings, sponsors, timeline } from '../data/siteData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);

export async function fetchPublicData() {
  if (!supabase) {
    return {
      siteSettings,
      socialLinks: [],
      events,
      news,
      repertoire,
      galleryAlbums,
      members,
      sponsors,
      timeline,
    };
  }

  try {
    const [eventsResponse, newsResponse, repertoireResponse, galleryResponse, membersResponse, sponsorsResponse, timelineResponse] = await Promise.all([
      supabase.from('events').select('*').order('date', { ascending: true }),
      supabase.from('news').select('*').eq('status', 'publicada').order('fecha_publicación', { ascending: false }),
      supabase.from('repertoire').select('*').order('title', { ascending: true }),
      supabase.from('gallery_albums').select('*').order('fecha', { ascending: false }),
      supabase.from('members').select('*').eq('visible', true).order('orden', { ascending: true }),
      supabase.from('sponsors').select('*').eq('activo', true).order('orden', { ascending: true }),
      supabase.from('timeline').select('*').order('orden', { ascending: true }),
    ]);

    return {
      siteSettings,
      socialLinks: [],
      events: eventsResponse.data ?? events,
      news: newsResponse.data ?? news,
      repertoire: repertoireResponse.data ?? repertoire,
      galleryAlbums: galleryResponse.data ?? galleryAlbums,
      members: membersResponse.data ?? members,
      sponsors: sponsorsResponse.data ?? sponsors,
      timeline: timelineResponse.data ?? timeline,
    };
  } catch (error) {
    console.error('Supabase public data error:', error);
    return {
      siteSettings,
      socialLinks: [],
      events,
      news,
      repertoire,
      galleryAlbums,
      members,
      sponsors,
      timeline,
    };
  }
}
