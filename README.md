# Marvel Comics Display App

![602shots_so](https://github.com/Ronambulo/marvel-API-calls/blob/main/Sin%20t%C3%ADtulo.jpg)


Esta aplicación muestra cómics de Marvel, permitiendo a los usuarios explorar y marcar sus favoritos, ver personajes de cada cómic y acceder a más información detallada.

## Características

- **Visualización de cómics**: Muestra una lista de cómics de Marvel, ordenados por última modificación.
- **Favoritos**: Permite agregar y quitar cómics de la lista de favoritos, almacenados en `localStorage`.
- **Información detallada**: Los usuarios pueden ver detalles de un cómic y sus personajes asociados.
- **Interfaz intuitiva**: Diseño simple y moderno, utilizando CSS y clases de Tailwind para estilos personalizados.

## Requisitos

- Node.js (v14 o superior)
- Llaves API de Marvel (pública y privada) almacenadas en `privateKeys.js`

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/marvel-comics-display.git
   cd marvel-comics-display
   ```
   
2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura tus claves de API de Marvel:
   - Crea un archivo llamado `privateKeys.js` en la raíz del proyecto y define tus claves de la siguiente manera:

   ```javascript
   export const MARVEL_API_PUBLIC_KEY = 'tu_clave_publica';
   export const MARVEL_API_PRIVATE_KEY = 'tu_clave_privada';
   ```

4. Inicia la aplicación:
   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`.

## Uso

1. **Visualizar cómics**: Al abrir la aplicación, se cargarán los cómics más recientes de Marvel.
2. **Marcar como favorito**: Haz clic en el ícono de estrella para agregar o quitar cómics de la lista de favoritos.
3. **Ver información adicional**: Usa el botón "Saber más" para ver detalles del cómic y los personajes asociados.

## Tecnologías utilizadas

- **React**: Framework principal de la aplicación.
- **Marvel API**: Para obtener datos en tiempo real de cómics y personajes.
- **CSS y Tailwind**: Para el diseño y la apariencia visual.
- **React Icons**: Para iconos en la aplicación.
