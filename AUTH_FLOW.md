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