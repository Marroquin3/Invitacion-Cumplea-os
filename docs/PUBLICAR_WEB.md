# Publicar la invitacion

La invitacion es una web estatica: no necesita Node, Python ni un servidor propio para que otras personas la visiten.

## Opcion recomendada: Netlify Drop

1. Abre `https://app.netlify.com/drop`.
2. Inicia sesion o crea una cuenta gratuita.
3. Arrastra la carpeta completa del proyecto `Curso Agentes ia` al recuadro de Netlify.
4. Espera a que termine la carga.
5. Netlify mostrara una URL parecida a `https://nombre-aleatorio.netlify.app`.
6. Comparte esa URL con los invitados.

El archivo `netlify.toml` ya indica que la carpeta raiz es la carpeta publica.

## Comprobar las confirmaciones

1. Abre la URL publica.
2. Completa el formulario con un nombre de prueba.
3. Selecciona `Si, voy`.
4. Pulsa `Enviar respuesta`.
5. Abre Google Sheets y entra en la pestaña `Respuestas`.
6. Deberia aparecer una nueva fila con fecha, nombre, asistencia y mensaje.

## Si la respuesta no aparece

- Comprueba que la URL de `src/data/event.js` termina en `/exec`.
- En Apps Script, revisa que la implementacion sea una **Aplicacion web**.
- Verifica que **Ejecutar como** sea tu cuenta.
- Verifica que el acceso sea **Cualquiera**.
- Si modificaste `Code.gs`, crea una nueva version desde **Implementar > Administrar implementaciones > Editar > Nueva version**.
- Recarga la web publicada con `Ctrl + F5`.

## Cambiar el nombre de la web

En Netlify abre el sitio y entra en **Site configuration > Domain management > Options > Edit site name**. Elige un nombre disponible, por ejemplo `noche-de-jack-diego`.

## Importante

La URL de Google Apps Script funciona como receptor publico del formulario. La hoja de calculo no se hace publica: mantenla compartida solo con las cuentas que deban consultar la lista.

## Alternativa: GitHub Pages

Tambien puedes publicar el proyecto desde GitHub. El repositorio ya incluye `.github/workflows/pages.yml`, que publica automaticamente cada vez que haces `push` a la rama `main`.

1. Crea un repositorio nuevo en `https://github.com/new`.
2. No agregues README, `.gitignore` ni licencia desde GitHub, porque el proyecto ya tiene sus archivos.
3. En PowerShell, desde la carpeta del proyecto, ejecuta:

```powershell
git init
git add .
git commit -m "Crear invitacion de Halloween"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

4. En GitHub abre **Settings > Pages**.
5. En **Build and deployment**, selecciona **GitHub Actions**.
6. Abre la pestaña **Actions** y espera a que termine `Publicar invitacion`.
7. La web quedara disponible en `https://TU_USUARIO.github.io/TU_REPOSITORIO/`.

Cada vez que cambies la invitacion, repite `git add .`, `git commit -m "Actualizar invitacion"` y `git push`.
