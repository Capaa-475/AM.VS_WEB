# Checklist de pruebas

No se marca ninguna prueba como completada sin ejecutarla realmente.

## 1. Arranque local

- [ ] Ejecutar `npm install`
- [ ] Ejecutar `npm run dev`
- [ ] Comprobar que el sitio abre en `http://localhost:5173`
- [ ] Verificar que el menú funciona en móvil y escritorio

## 2. Verificación de TypeScript y compilación

- [ ] Ejecutar `npm run build`
- [ ] Comprobar que no hay errores de TypeScript
- [ ] Confirmar que la carpeta `dist` se genera correctamente

## 3. Verificación de rutas

- [ ] Comprobar `/`
- [ ] Comprobar `/historia`
- [ ] Comprobar `/repertorio`
- [ ] Comprobar `/actuaciones`
- [ ] Comprobar `/galeria`
- [ ] Comprobar `/componentes`
- [ ] Comprobar `/patrocinadores`
- [ ] Comprobar `/contacto`
- [ ] Comprobar `/admin`
- [ ] Comprobar una ruta 404

## 4. Validación de formularios

- [ ] Validar que falta el nombre
- [ ] Validar mail incorrecto
- [ ] Validar teléfono vacío
- [ ] Validar mensaje breve
- [ ] Confirmar que se muestra mensaje de éxito cuando el formulario es correcto

## 5. Seguridad y permisos

- [ ] Comprobar que el panel no se abre sin autenticación
- [ ] Revisar que las políticas RLS están preparadas en `supabase/policies.sql`
- [ ] Confirmar que no hay `service_role` en el frontend
- [ ] Confirmar que no se usan contraseñas en tablas propias

## 6. Supabase

- [ ] Crear proyecto Supabase
- [ ] Ejecutar `supabase/schema.sql`
- [ ] Ejecutar `supabase/seed.sql`
- [ ] Comprobar que las tablas existen
- [ ] Configurar variables de entorno
- [ ] Probar lectura de datos públicos con un proyecto real

## 7. Storage

- [ ] Crear buckets de gallery, news, repertoire, sponsors, members, assets
- [ ] Subir un archivo de prueba
- [ ] Confirmar que la ruta se almacena en la base de datos
- [ ] Comprobar y documentar permisos según corresponda

## 8. Responsive y accesibilidad

- [ ] Probar en móvil
- [ ] Probar en tablet
- [ ] Probar en escritorio
- [ ] Comprobar navegación por teclado
- [ ] Revisar contraste y legibilidad
- [ ] Revisar que los formularios tengan etiquetas accesibles

## 9. SEO básico

- [ ] Verificar título de la página principal
- [ ] Revisar meta description
- [ ] Revisar og:title y og:description
- [ ] Confirmar que existe `robots.txt`
- [ ] Confirmar que existe `sitemap.xml`
- [ ] Confirmar que existe favicon

## 10. Despliegue provisional

- [ ] Comprobar que el repositorio está en GitHub
- [ ] Vincular proyecto de Cloudflare Pages
- [ ] Verificar la compilación correcta con `npm run build`
- [ ] Confirmar que la URL funciona
- [ ] Documentar que la publicación provisional no es permanente
