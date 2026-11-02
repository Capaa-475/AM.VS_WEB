# Guía de primeras pruebas de AM VS

Guía para Windows 11 y PowerShell. En esta fase se comprueba que la web local y la base de datos funcionan. No publiques todavía datos personales ni uses contraseñas de cuentas reales en pruebas.

## Importante: qué está y qué no está conectado

- La web local puede arrancar y compilar con Vite.
- `supabase/schema.sql` y `supabase/seed.sql` preparan tablas y algunos datos oficiales iniciales.
- Con `.env` configurado, la web lee desde Supabase los datos públicos de actuaciones, noticias publicadas, repertorio, álbumes, componentes visibles, patrocinadores activos, línea del tiempo y ajustes del sitio. Si las tablas no tienen filas, algunas secciones mostrarán sus estados vacíos.
- El formulario de contacto sólo valida en el navegador; todavía no guarda solicitudes.
- El inicio del panel usa un acceso local de demostración, no Supabase Auth. No introduzcas aquí una contraseña real.
- No ejecutes todavía `supabase/policies.sql`: antes de usarlo hay que revisar sus políticas. En particular, el acceso a `profiles` puede producir recursión RLS y el alta pública de solicitudes necesita protección contra abuso.
- El SQL disponible no configura Storage. Los buckets tampoco se crean por haber ejecutado `schema.sql`.

La lectura pública está implementada, pero no publiques el sitio hasta que RLS y los permisos estén revisados. La lectura correcta de una tabla no sustituye una auditoría de seguridad.

## 1. Comprobar el proyecto en tu ordenador

Abre PowerShell y sitúate en la carpeta del proyecto:

```powershell
Set-Location 'P:\Web AMVS'
node -v
npm -v
```

Instala dependencias y compila:

```powershell
npm install
npm run build
```

Si la compilación termina correctamente, inicia la web:

```powershell
npm run dev
```

Abre la dirección que Vite indique, normalmente <http://localhost:5173/>. Comprueba las páginas Inicio, Historia, Repertorio, Actuaciones, Galería, Componentes, Patrocinadores y Contacto. Prueba también una dirección inexistente para ver la página 404. Para cerrar el servidor, vuelve a PowerShell y pulsa `Ctrl+C`.

## 2. Crear un proyecto de prueba en Supabase

1. Entra en <https://supabase.com/> e inicia sesión o crea una cuenta.
2. Pulsa **New project** y elige una organización.
3. Usa un nombre que identifique que es de pruebas, por ejemplo `amvs-pruebas`.
4. Genera una contraseña fuerte para la base de datos y guárdala en un gestor de contraseñas. No la pongas en el código ni la compartas por el chat.
5. Elige la región más cercana disponible y pulsa **Create new project**.
6. Espera a que el proyecto termine de aprovisionarse.

No habilites el registro público de usuarios administradores. Para estas primeras pruebas no hace falta crear usuarios ni configurar Auth.

## 3. Crear las tablas y datos iniciales

1. En el proyecto de Supabase abre **SQL Editor**.
2. Selecciona **New query**.
3. Abre `supabase/schema.sql` en VS Code, copia todo el contenido y pégalo en el editor SQL.
4. Pulsa **Run**. Comprueba que Supabase informa que terminó sin errores.
5. Crea otra consulta nueva.
6. Copia y ejecuta `supabase/seed.sql`.
7. Ejecuta el seed una sola vez: algunas filas de historia, actuaciones y repertorio pueden duplicarse si se repite.

Si aparece un error, no sigas con políticas ni datos adicionales. Copia el texto del error (sin contraseñas, tokens ni claves) para diagnosticarlo.

## 4. Comprobar la base de datos desde Supabase

En **SQL Editor**, crea una consulta y ejecuta:

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
```

Deberías ver las tablas `profiles`, `events`, `news`, `repertoire`, `gallery_albums`, `gallery_items`, `members`, `sponsors`, `contact_requests`, `timeline` y `site_settings`.

Comprueba algunas filas iniciales:

```sql
select clave, valor from public.site_settings order by clave;
select titulo, estado, fecha from public.events order by titulo;
select titulo, autor, categoria from public.repertoire order by titulo;
select anio, titulo from public.timeline order by orden;
```

Como `schema.sql` aún no activa RLS, estas pruebas sólo verifican la creación y lectura desde el editor SQL de Supabase. No significan que el acceso público desde la web ya sea seguro o esté configurado.

## 5. Variables de entorno (preparación; no es aún una prueba de lectura)

En Supabase abre **Project Settings → API** (en algunas versiones del panel aparece como **Project Settings → API Keys**). Copia:

- **Project URL** para `VITE_SUPABASE_URL`.
- La clave pública **anon / publishable** para `VITE_SUPABASE_ANON_KEY`.

La etiqueta exacta de la clave depende de la versión de Supabase. Usa sólo la clave pública. **Nunca copies `service_role`, `secret` ni la contraseña de la base de datos a una variable `VITE_`**: las variables Vite quedan visibles en el navegador.

En PowerShell, crea el archivo local `.env` desde la plantilla:

```powershell
Set-Location 'P:\Web AMVS'
Copy-Item .env.example .env
notepad .env
```

Rellénalo sin comillas, sustituyendo los ejemplos por los valores de tu proyecto:

```env
VITE_SUPABASE_URL=https://TU-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=TU-CLAVE-PUBLICA
```

Guarda y cierra el archivo. `.env` está excluido por `.gitignore`; no lo añadas manualmente a GitHub. Reinicia Vite después de cambiar variables. Al abrir la web, las páginas públicas consultan Supabase; si falla la petición, se muestra un aviso y se conservan los datos locales de respaldo.

## 6. Crear el repositorio GitHub

Si aún no tienes un repositorio:

1. Entra en <https://github.com/> e inicia sesión.
2. Pulsa **New repository**.
3. Elige un nombre, por ejemplo `web-amvs`.
4. Déjalo **Private** para las primeras pruebas.
5. No selecciones README, `.gitignore` ni licencia si GitHub ofrece esas opciones: el proyecto ya tiene archivos y se evitará un conflicto inicial.
6. Pulsa **Create repository** y deja abierta la página con las instrucciones del repositorio.

En PowerShell ejecuta desde la carpeta del proyecto:

```powershell
Set-Location 'P:\Web AMVS'
git status
```

Si Git muestra que esta carpeta todavía no es un repositorio, inicialízalo y prepara el primer commit:

```powershell
git init
git add .
git status
```

Antes de confirmar, comprueba que `.env` **no** aparece en la lista de archivos preparados. Si aparece, no continúes; revisa `.gitignore` y quítalo del área de preparación con `git rm --cached .env`.

Después:

```powershell
git commit -m "Preparar primera versión de AM VS"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/web-amvs.git
git push -u origin main
```

Sustituye `TU-USUARIO` y el nombre del repositorio por los reales. Si Git pide autenticación, completa el inicio de sesión que abra Git Credential Manager; no pegues tokens dentro de los comandos ni en archivos del proyecto.

Para futuras actualizaciones:

```powershell
git add .
git commit -m "Describir el cambio"
git push
```

## 7. Primera prueba conjunta local + base de datos

La prueba conjunta consiste en:

1. Confirmar que `npm run build` finaliza correctamente.
2. Confirmar que `npm run dev` sirve la web en localhost.
3. Confirmar desde SQL Editor que las tablas existen y que `seed.sql` insertó las filas esperadas.
4. Abrir la web, revisar que carga los datos de las tablas y mirar la consola del navegador si aparece un error.
5. Confirmar que `.env` no se subió a GitHub.

Todavía no intentes validar Auth, CRUD desde el panel, formulario persistido ni Storage desde la web: esas funciones requieren implementación. No introduzcas nombres, correos, fotografías ni otros datos de componentes sin autorización.

## 8. Storage, autenticación y RLS: no activar todavía

Antes de una publicación abierta o de añadir datos privados:

- Se crearán los buckets necesarios en **Storage** y se definirán sus políticas.
- Se conectará el formulario a `contact_requests` con validación y una política de inserción segura.
- Se conectará el inicio del panel a Supabase Auth y se preparará la invitación controlada de usuarios.
- Se revisarán las políticas RLS por tabla y se probará el acceso anónimo, editor, administrador y superadministrador.

Hasta entonces, no ejecutes `supabase/policies.sql` en un proyecto que vaya a contener datos reales. Si ya lo ejecutaste, no des por segura la base: hay que revisar las políticas aplicadas.

## 9. Publicar una vista previa en Cloudflare Pages (opcional)

Haz esto sólo después de confirmar el primer push a GitHub:

1. Entra en <https://pages.cloudflare.com/> e inicia sesión o crea una cuenta.
2. Elige **Create a project** y conecta GitHub.
3. Autoriza el acceso al repositorio `web-amvs` y selecciónalo.
4. Configura:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Pulsa **Save and Deploy** y espera a que finalice.
6. Abre la URL `*.pages.dev` que proporcione Cloudflare.

Para una vista previa segura, no configures variables Supabase hasta tener RLS revisado. Una URL de Pages es un despliegue web accesible desde internet, no un túnel privado ni un enlace local. No publiques datos privados ni expongas el panel de demostración.

## 10. Checklist para cerrar las primeras pruebas

- [ ] `npm run build` termina correctamente.
- [ ] `npm run dev` abre la web en localhost.
- [ ] Se recorrieron las rutas públicas y la página 404.
- [ ] `schema.sql` se ejecutó correctamente.
- [ ] `seed.sql` se ejecutó una sola vez.
- [ ] Las consultas de verificación devuelven tablas y filas.
- [ ] `.env` no aparece en Git ni en el repositorio remoto.
- [ ] El primer push a GitHub terminó correctamente (si se creó repositorio).
- [ ] Cloudflare Pages publica la vista previa (si se eligió desplegar).

Marca las casillas sólo después de ejecutar cada comprobación.
