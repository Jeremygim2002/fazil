# Flujo de autenticacion

Este proyecto usa Google + Firebase en la app mobile y NestJS en el server.

## Flujo corto

1. La pantalla [mobile/app/(auth)/login.tsx](mobile/app/(auth)/login.tsx) inicia el login con Google desde Expo Auth Session.
2. Google devuelve la respuesta en [mobile/app/oauthredirect.tsx](mobile/app/oauthredirect.tsx).
3. Esa pantalla intercambia el `code` por tokens, crea una credencial de Firebase y hace `signInWithCredential`.
4. La app obtiene el Firebase ID token y lo envía al backend con [mobile/services/auth.ts](mobile/services/auth.ts).
5. El backend recibe el token en [server/src/auth/auth.controller.ts](server/src/auth/auth.controller.ts) y lo valida en [server/src/auth/auth.service.ts](server/src/auth/auth.service.ts).
6. Si el token es valido, el server devuelve el usuario y lo guarda en BigQuery si puede.

## En el server

- `POST /auth/login` valida el token y devuelve `{ message, user }`.
- `GET /auth/me` lee `Authorization: Bearer <token>` y devuelve el perfil.

## Nota

`mobile/hooks/useAuth.ts` muestra otro camino de login con email y password, pero el flujo activo que usa la pantalla de Google es el de `login.tsx` -> `oauthredirect.tsx` -> `services/auth.ts`.

## Idea clave

La pantalla no habla directo con NestJS. Primero se autentica con Google/Firebase en el mobile y despues manda el token seguro al server para que Nest lo verifique.

## Candidatos A Borrar

Estos son los archivos que hoy parecen prescindibles o solo de ejemplo/template:

- [mobile/hooks/useAuth.ts](mobile/hooks/useAuth.ts): no aparece usado por ninguna pantalla o servicio. Borrarlo no afecta el flujo actual de Google/Firebase.
- [server/src/app.controller.ts](server/src/app.controller.ts) y [server/src/app.service.ts](server/src/app.service.ts): solo exponen `GET /` con `Hello World!`. Borrarlos elimina ese endpoint de salud, pero no toca `auth`.
- [mobile/components/external-link.tsx](mobile/components/external-link.tsx): no encontré referencias en el codigo fuente.
- [mobile/components/hello-wave.tsx](mobile/components/hello-wave.tsx): no encontré referencias en el codigo fuente.
- [mobile/components/parallax-scroll-view.tsx](mobile/components/parallax-scroll-view.tsx): no encontré referencias en el codigo fuente.
- [mobile/components/haptic-tab.tsx](mobile/components/haptic-tab.tsx): no encontré referencias en el codigo fuente.
- [mobile/components/ui/collapsible.tsx](mobile/components/ui/collapsible.tsx): no encontré referencias externas; depende de `icon-symbol`, asi que si lo borras probablemente tambien sobran esos iconos.
- [mobile/components/ui/icon-symbol.tsx](mobile/components/ui/icon-symbol.tsx) y [mobile/components/ui/icon-symbol.ios.tsx](mobile/components/ui/icon-symbol.ios.tsx): no encontré usos fuera de `collapsible`.

## No Borrar Aun

Estos si estan conectados al flujo real y borrarlos rompe algo visible:

- [mobile/app/(auth)/login.tsx](mobile/app/(auth)/login.tsx)
- [mobile/app/oauthredirect.tsx](mobile/app/oauthredirect.tsx)
- [mobile/services/auth.ts](mobile/services/auth.ts)
- [mobile/app/(tabs)/index.tsx](mobile/app/(tabs)/index.tsx)
- [mobile/app/(tabs)/profile.tsx](mobile/app/(tabs)/profile.tsx)
- [server/src/auth/auth.controller.ts](server/src/auth/auth.controller.ts)
- [server/src/auth/auth.service.ts](server/src/auth/auth.service.ts)