# GYMETRA Frontend

Este proyecto contiene los frontends de la aplicación GYMETRA: admin-frontend y gymetra-frontend.

## Validaciones Realizadas (Rol QA)

Como QA, realizamos pruebas exhaustivas en ambos frontends para asegurar calidad y funcionalidad. Aquí el reporte de validaciones:

### Admin Frontend
- **Instalación de dependencias**: Verificamos que `npm install` complete sin errores, confirmando que todas las librerías (Vue 3, Ionic, Axios, xlsx, jspdf) se instalen correctamente.
- **Build de producción**: Ejecutamos `npm run build` y validamos que genere la carpeta `dist` con todos los archivos necesarios, sin warnings críticos.
- **Servidor de desarrollo**: Iniciamos con `npm run dev` y confirmamos que el servidor responda en localhost:8101, cargando la página inicial sin errores 404.
- **Contenedor Docker**: Construimos la imagen y verificamos que el contenedor inicie, exponga el puerto 8101 y responda a requests HTTP.
- **Interfaz de usuario**: Probamos la carga de la página de login, navegación al dashboard, y funcionamiento de botones como "Generar Reporte" y "Exportar Excel".
- **Funcionalidad básica**: Revisamos que los formularios de login y registro funcionen, que los estilos CSS se apliquen correctamente, y que no haya errores en la consola del navegador.
- **Responsive design**: Comprobamos que la interfaz se adapte a diferentes tamaños de pantalla, especialmente en móviles y tablets.
- **Integración con APIs**: Simulamos llamadas a endpoints (aunque mockeadas) para verificar manejo de respuestas y errores.

### Gymetra Frontend
- **Framework**: Utiliza Ionic Vue para desarrollo móvil-first, con componentes nativos y Capacitor para integración móvil.
- **Dependencias**: Aseguramos que `npm install` instale Ionic, Vue, Capacitor y otras dependencias sin conflictos, verificando versiones compatibles.
- **Compilación**: Ejecutamos `npm run build` y confirmamos que produzca archivos optimizados en `dist`, listos para despliegue.
- **Modo desarrollo**: Probamos `ionic serve` (o `npm run dev` con Vite) en puerto 8100, verificando hot-reload y que la app cargue sin delays excesivos.
- **Dockerización**: Validamos que la imagen se construya correctamente, el contenedor ejecute el servidor y sea accesible externamente.
- **UX/UI**: Testeamos la página de inicio, login, registro y navegación entre vistas, asegurando que los componentes Ionic rendericen bien.
- **Funcionalidades clave**: Verificamos formularios de pago, QR codes, perfiles de usuario y que las transiciones sean suaves.
- **Compatibilidad**: Probamos en navegadores modernos (Chrome, Firefox) y confirmamos que no haya errores de JavaScript.
- **Performance**: Medimos tiempos de carga inicial y aseguramos que la app no exceda límites razonables de recursos.

## Configuración del Pipeline
El proyecto incluye un Jenkinsfile para CI/CD que construye las imágenes Docker y las despliega usando Docker Compose. Se configura por rama en GitHub para automatizar el despliegue.
