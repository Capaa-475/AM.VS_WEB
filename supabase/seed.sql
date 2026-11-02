-- Datos iniciales mínimos. Reemplaza o amplía con contenido real cuando se disponga de la información oficial.
insert into site_settings (clave, valor) values
  ('site_name', 'Agrupación Musical Virgen de la Soledad de Doña Mencía'),
  ('site_siglas', 'AM VS'),
  ('site_director', 'Pedro López'),
  ('site_locality', 'Doña Mencía, Córdoba, Andalucía, España'),
  ('site_phone', '+34 699 14 26 01'),
  ('site_rehearsal_address', 'Cerca de C. el Jardinito, 13, 14860 Doña Mencía, Córdoba'),
  ('site_history', 'A finales de la Semana Santa de 2008 surgió la idea de crear una agrupación musical a partir de la antigua banda de la Cofradía de Nuestra Señora de la Soledad y Esperanza de Doña Mencía.'),
  ('site_values', 'Tradición;Juventud;Devoción')
on conflict (clave) do update set valor = excluded.valor, updated_at = now();

insert into timeline (anio, titulo, descripcion, orden)
values
  ('2008', 'Nacimiento de la agrupación', 'Se crea la idea de formar una nueva agrupación musical a partir de la antigua banda de la Cofradía de Nuestra Señora de la Soledad y Esperanza.', 1),
  ('2008', 'Primeros ensayos', 'Comienzan clases de solfeo y primeros ensayos con la dirección de Manolo Luque.', 2),
  ('2008', 'Primera salida procesional', 'La agrupación acompaña a la cruz guía de la Cofradía en el Sábado de Gloria.', 3),
  ('2010', 'Padrinazgo', 'Se produce el padrinazgo por parte de la A.M. Nuestro Padre Jesús de los Afligidos, de Puente Genil.', 4)
on conflict do nothing;

insert into events (titulo, descripcion, localidad, tipo, estado, fecha)
values
  ('Sábado de Gloria', 'Actuación habitual de la agrupación en Doña Mencía.', 'Doña Mencía', 'Procesión', 'celebrada', null),
  ('Certámenes de Cuaresma', 'Participación en certámenes y actos de Cuaresma.', 'Doña Mencía', 'Certámenes', 'proxima', null)
on conflict do nothing;

insert into repertoire (titulo, autor, categoria, descripcion)
values
  ('Suena la Soledad', 'Director', 'Marcha', 'Marcha de paso ordinario compuesta por el director.'),
  ('Candela', 'Director', 'Composición', 'Composición realizada por el director para su hija.'),
  ('Himno Nacional de España', 'Tradicional', 'Himno', 'Obra incluida en el repertorio de la agrupación.')
on conflict do nothing;
