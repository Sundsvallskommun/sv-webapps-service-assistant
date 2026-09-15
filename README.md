# Sundsvalls Kommun - Service assistant

Tillägg till Sitevision.
AI-assistent som kan köras bland löpande innehåll på sida.

## Bygga gemensam kod

Installera beroendena i `shared`, `app` och `sitevision` med `yarn install` i
respektive katalog. `@shared` är ett lokalt paket från `shared`.

Kör `yarn build` i `shared` för att skapa JavaScript och typdeklarationer i
`shared/dist`. Bygget uppdaterar också paketkopiorna i apparnas `node_modules`,
så att Yarns cache för lokala paket inte lämnar kvar äldre kod.
Importera både typer och hjälpfunktioner från paketets rot:

```ts
import { getHeadingLevel, type Options } from "@shared";
```

`build` och `dev` i båda apparna bygger automatiskt `shared` först. Det gäller
även `typecheck` i `app` och `test` i `sitevision`. Starta om en pågående
utvecklingsserver efter ändringar i `shared`, eller kör `yarn build` i `shared`
för att uppdatera paketets utdata.

## /app

React app.
Detta är assistenten som körs på klientsidan.
Denna kan köras fristående i dev-läge under utveckling.

Läs om hur den fungerar i `./app/README.md`.

När du har byggt appen kopieras den till `/sitevision`.
Detta måste ske innan du kan utveckla och/eller bygga sitevision-appen.

## /sitevision

Sitevision webbapp.
Insticksmodul till Sitevision.

Läs om hur den fungerar i `./sitevision/README.md`.
