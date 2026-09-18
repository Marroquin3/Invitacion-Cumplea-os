# Lista de asistencia

## 1. Crear la hoja

1. Abre [sheets.google.com](https://sheets.google.com) y crea una hoja nueva.
2. Ponle un nombre como `Cumpleanos Diego`.
3. Abre **Extensiones > Apps Script**.
4. Borra el contenido del editor y pega el contenido de `backend/Code.gs`.
5. Guarda el proyecto.

## 2. Preparar la pestaña

En Apps Script ejecuta una vez la funcion `setupSheet`. Google pedira autorizacion: revisa los permisos y acepta. La funcion creara la pestaña `Respuestas` con estas columnas:

`Fecha de respuesta | Nombre | Asistencia | Mensaje`

## 3. Publicar el endpoint

1. En Apps Script selecciona **Implementar > Nueva implementacion**.
2. Elige **Aplicacion web**.
3. En **Ejecutar como**, selecciona tu cuenta.
4. En **Quien tiene acceso**, selecciona **Cualquier usuario**.
5. Pulsa **Implementar** y copia la URL que termina en `/exec`.

## 4. Conectar la invitacion

Abre `src/data/event.js` y pega la URL en `sheetsEndpoint`:

```js
sheetsEndpoint: 'https://script.google.com/macros/s/TU_ID/exec'
```

Guarda el archivo y vuelve a publicar la invitacion. Cada respuesta del formulario aparecera como una fila nueva en la pestaña `Respuestas`.

## Como ver la lista

Abre tu hoja de Google Sheets y entra en la pestaña `Respuestas`. Puedes usar filtros sobre la columna `Asistencia` para ver `Si, voy`, `Aun no lo se` o `No podre ir`. La fecha de respuesta se agrega automaticamente.

## Importante

La URL de Apps Script es publica para poder recibir respuestas, pero la hoja sigue siendo privada en tu cuenta de Google. No compartas el enlace de la hoja si no quieres que otras personas vean la lista.
