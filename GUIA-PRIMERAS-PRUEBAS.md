# Qué hacer ahora: primeras pruebas de AM VS

Esta guía parte del estado actual del proyecto:

- El repositorio es `Capaa-475/AM.VS_WEB`, en la rama `main`.
- La web ya tiene configuradas las lecturas públicas de Supabase.
- Las credenciales locales están en `.env`; ese archivo no se sube a GitHub.
- Ya ejecutaste `schema.sql` y `seed.sql`.
- No se han conectado todavía el inicio de sesión real, los cambios CRUD, el envío del formulario ni Storage.

## 1. No vuelvas a ejecutar el seed todavía

Aunque ya lo ejecutaste, la última comprobación desde la web encontró cero filas en las tablas públicas. Primero averigua si los datos están en la base de datos o si el acceso de lectura los está ocultando.

1. Abre el proyecto correcto en Supabase.
2. Entra en **SQL Editor → New query**.
3. Ejecuta esta consulta de sólo lectura:

```sql
select
  (select count(*) from public.site_settings) as ajustes,
  (select count(*) from public.events) as actuaciones,
  (select count(*) from public.repertoire) as repertorio,
  (select count(*) from public.timeline) as historia;
```

Después comprueba los datos sin mostrar información privada:

```sql
select clave from public.site_settings order by clave;
select titulo, estado from public.events order by titulo;
select titulo, autor from public.repertoire order by titulo;
select anio, titulo from public.timeline order by orden;
```

El seed actual debería dejar, como mínimo, 8 ajustes, 2 actuaciones, 3 obras de repertorio y 4 elementos de historia. Si aparecen esas filas en SQL Editor, **no ejecutes de nuevo `seed.sql`**: el problema está en el acceso desde la web y habrá que revisar RLS/permisos y confirmar el Project URL.

Si SQL Editor muestra cero filas, comprueba que abriste el mismo proyecto cuyo Project URL está en el `.env` local. Sólo cuando confirmes el proyecto correcto, vuelve a ejecutar `supabase/seed.sql` una vez. No repitas `schema.sql`.

## 2. Probar la web local actualizada

Abre PowerShell:

```powershell
Set-Location 'P:\Web AMVS'
git status --short --branch
git pull --ff-only origin main
npm install
npm run build
npm run dev
```

Si Git informa que ya está actualizado, continúa. Si `git status` muestra cambios tuyos que no has guardado, no uses `git reset`, no los descartes y no fuerces el pull; detente y pide ayuda.

Abre <http://localhost:5173/>. Comprueba:

1. Que la página principal carga y no aparece el aviso de error de Supabase.
2. Las rutas `/historia`, `/repertorio` y `/actuaciones`.
3. Que las secciones sin datos muestran su mensaje de estado vacío.
4. En `/galeria`, `/componentes` y `/patrocinadores`, el estado vacío es esperado hasta cargar contenido autorizado.
5. Para revisar errores, pulsa `F12`, abre **Console** y **Network**, recarga, y busca peticiones a `rest/v1`. No compartas capturas que muestren valores de claves.

Una respuesta HTTP 200 confirma que la petición llegó a Supabase; no confirma por sí sola que la política RLS sea segura ni que los datos estén completos.

## 3. Qué no probar ni publicar aún

- No uses el panel `/admin` con contraseñas reales: el acceso actual es sólo una demostración local, no Supabase Auth.
- No envíes el formulario esperando que se guarde: por ahora sólo valida en el navegador.
- No subas fotos, nombres ni datos de componentes sin consentimiento.
- No ejecutes `supabase/policies.sql` hasta que se revisen y corrijan las políticas.
- No publiques la web en Cloudflare Pages todavía. Antes hay que terminar Auth/RLS y retirar el acceso de demostración al panel. La configuración actual no es apropiada para exponer un panel público.

## 4. Próxima fase técnica

Cuando las lecturas públicas y los datos estén comprobados, la siguiente implementación debe:

1. Revisar y corregir las políticas RLS; activar RLS en todas las tablas y comprobar anon/editor/admin/superadmin.
2. Conectar `/admin` a Supabase Auth con invitaciones controladas y sin registro público.
3. Implementar operaciones CRUD protegidas por RLS.
4. Conectar el formulario a `contact_requests`, con validación y protección contra abuso.
5. Crear los buckets de Storage y sus políticas de lectura/subida/eliminación.
6. Volver a probar compilación, rutas, permisos y comportamiento móvil.
7. Sólo después preparar el despliegue de Cloudflare Pages.

## 5. Qué hacer si algo falla

- **SQL Editor muestra filas pero la página no:** confirma el Project URL local y revisa errores de red/permisos. No vuelvas a cargar el seed.
- **SQL Editor no muestra filas:** verifica que ejecutaste el seed en el proyecto correcto; si es el correcto, ejecuta el seed una sola vez.
- **Vite indica que falta una variable:** comprueba que existe `.env` junto a `package.json`, con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. No pegues la clave en GitHub ni en el chat.
- **Falla `npm run build`:** guarda el mensaje completo de error, sin publicar valores privados.

## Lista de primeras pruebas

- [ ] SQL Editor confirma si hay datos y en qué tablas.
- [ ] La web local abre en `http://localhost:5173/`.
- [ ] No aparece error de conexión con Supabase.
- [ ] Las páginas públicas se recorren correctamente.
- [ ] Las tablas vacías muestran estados vacíos, no datos inventados.
- [ ] No se repite el seed si ya hay filas.
- [ ] No se publica el sitio hasta asegurar Auth y RLS.
