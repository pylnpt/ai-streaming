# StreamWithAI — Hibrid, kliensoldali tartalommoderáció streaming chatben

EKKE BSc szakdolgozati projekt. Élő streaming platform Next.js 14 + LiveKit alapon, hibrid (kliensoldali AI + szabályalapú) chat-tartalommoderációval.

## Technológiai stack

- **Frontend / SSR**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Hitelesítés**: NextAuth.js v5 (JWT session, Google + GitHub OAuth + Credentials/bcrypt)
- **Adatbázis**: PostgreSQL + Prisma ORM
- **Streaming**: LiveKit (WebRTC) — kliensoldali player + szerveroldali ingress kulcsok
- **AI moderáció**: TensorFlow.js + `@tensorflow-models/toxicity` (kliensoldalon, böngészőben fut)
- **Képfeltöltés**: UploadThing
- **Tesztelés**: Jest + Testing Library

## Előfeltételek

- **Node.js 20+** és **npm 10+**
- **PostgreSQL** elérhetőség (lokálisan vagy felhőben — pl. [Neon](https://neon.tech), Supabase, Railway)
- **LiveKit projekt** ([livekit.io](https://livekit.io) — Cloud free tier elég)
- **UploadThing fiók** ([uploadthing.com](https://uploadthing.com))
- *(Opcionális)* Google és/vagy GitHub OAuth alkalmazás, ha külső bejelentkezést is szeretnél

## Telepítés

### 1. Repó klónozása

```bash
git clone https://github.com/pylnpt/ai-streaming.git
cd ai-streaming
```

### 2. Függőségek telepítése

```bash
npm install
```

A `postinstall` hook automatikusan lefuttatja a `prisma generate`-et.

### 3. Környezeti változók beállítása

Másold le a sablont:

```bash
cp .env.example .env
```

Töltsd ki a `.env` fájlt — minden szolgáltatáshoz külön regisztráció szükséges.

```env
# PostgreSQL connection string
POSTGRES_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# NextAuth — a SECRET-et generáld pl. ezzel: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generált-titok>"

# OAuth (opcionális — credentials login enélkül is működik)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# LiveKit (LiveKit Cloud dashboardról)
NEXT_PUBLIC_LIVEKIT_WS_URL="wss://<projekt>.livekit.cloud"
LIVEKIT_API_URL="https://<projekt>.livekit.cloud"
LIVEKIT_API_KEY="API..."
LIVEKIT_API_SECRET="..."

# UploadThing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."
```

### 4. Adatbázis migrációk

Üres adatbázison futtasd le a séma migrációkat:

```bash
npx prisma migrate deploy
```

Ezzel létrejön a teljes séma: `User`, `Account`, `Session`, `Stream`, `AIThreshold`, `AIFilter`, `UserFilters`, `CustomWord` (`WordType` enummal), `FilteredMessage`, `Follow`, `Block`.

*(Ha lokálisan fejlesztesz és új migrációkat is csinálnál: `npx prisma migrate dev`.)*

### 5. (Opcionális) Seed adatok

Az `AIFilter` és `AIThreshold` táblák kezdeti értékekkel való feltöltéséhez:

```bash
npx prisma db seed
```

### 6. Dev server indítása

```bash
npm run dev
```

Az alkalmazás elérhető: <http://localhost:3000>

## Használat

1. **Regisztrálj** a `/sign-up` oldalon (felhasználónév + email + jelszó, vagy Google/GitHub).
2. A profilon (`/u/<usernév>`) belül:
   - **`/streamkeys`** → LiveKit ingress kulcsok generálása OBS-hez
   - **`/aifilter`** → AI moderációs szűrő bekapcsolása, kategóriák, küszöbérték, egyedi szólisták (whitelist/blacklist)
   - **`/aifilter/logs`** → kiszűrt üzenetek naplója (visszaállítható)
   - **`/community`** → követők/blokkoltak kezelése
3. **Streamelés**: OBS-ben add meg a Server URL-t és Stream Key-t a `/streamkeys` oldalról, indítsd el a sugárzást.
4. Más felhasználók a főoldalon (`/`) látják a stream-edet, és a chatben moderált üzeneteket küldhetnek.

## Build (production)

```bash
npm run build
npm start
```

## Tesztelés

```bash
# Komponens unit tesztek (jsdom)
npx jest --selectProjects jsdom

# Hipotézis-tesztek (H1 latency, H2 AI vs rules, H3 hybrid) — LASSÚ, TF-modell letöltést igényel
npx jest --selectProjects node
```

A H1/H2/H3 mérések eredményei a `h1-latency-report.txt`, `h2-report.txt`, `h3-report.txt` fájlokba kerülnek a futtatás után.

## Projektstruktúra (rövid)

```
app/
  (auth)/         — sign-in, sign-up oldalak
  (browse)/       — főoldal, search, publikus user-profilok
  (dashboard)/    — bejelentkezett user beállításai (aifilter, streamkeys, eyetracking, community)
  (legal)/        — ÁSZF + Adatvédelmi tájékoztató
  api/            — auth és LiveKit/UploadThing webhookok
components/
  stream-player/  — LiveKit player + chat + moderáció
  auth/           — sign-in / sign-up űrlapok
  ui/             — shadcn alapkomponensek
hooks/
  use-toxicity-model.ts    — TensorFlow.js modell betöltés + cache
  use-filtered-messages.ts — kiszűrt üzenetek naplózása
  use-custom-words.ts      — whitelist/blacklist kezelés
lib/
  custom-words-service.ts, filtered-messages-service.ts, profanity-service.ts — Server Actions
prisma/
  schema.prisma   — adatmodell (PostgreSQL)
  migrations/     — verziókövetett séma-változások
__tests__/
  h1-latency.test.ts, h2-ai-vs-rules.test.ts, h3-hybrid.test.ts — hipotézis-mérések
```

## Ismert korlátok

- A toxicity modell első betöltése a böngészőben ~3-5 másodpercet vesz igénybe (~28 MB letöltés, cache után gyors).
- A `next-auth` v5 (béta) ESM-only, ezért egyes komponens-tesztekben (`streamer-info-card.test.tsx`) `BioModal`-mock kellhet.

## Licenc

Szakdolgozati projekt, oktatási célra. A LiveKit, UploadThing, NextAuth külön licenceik szerint használhatók.
