# Masterplan: Bundeswehr-Wohnungstausch-Platform

## 1. Projektübersicht
Eine Wohnungstauschbörse für Angehörige zweier Bundeswehr-Dienststellen in Berlin und Schwielowsee, gehostet auf Vercel.

## 2. Technologie-Stack
### Frontend
- **Next.js 14+** mit App Router
- **TailwindCSS** für responsives Design
- **Leaflet** für Kartenintegration
- **React-Query** für State Management
- **shadcn/ui** für UI-Komponenten
- **react-hot-toast** für Benachrichtigungen

### Backend & Infrastruktur
- **Next.js API Routes**
- **Prisma** als Type-Safe ORM
- **Vercel Postgres** für die Datenhaltung
- **Next-Auth** mit Magic Link Authentication
- **Cloudinary** für Bilderverwaltung (max. 10 Bilder pro Wohnung)
- **Vercel Hosting** für Deployment

## 3. Kernfunktionen

### Authentifizierung
- Magic Link Authentication über dienstliche E-Mail
- Geschützter Bereich für eigene Anzeigen
- Session-Management mit Next-Auth

### Wohnungsmanagement
- Erstellen, Bearbeiten und Löschen von Wohnungsanzeigen
- Maximaler Upload von 10 Bildern pro Wohnung
- Automatische Bildoptimierung via Cloudinary
- Status-Management (Aktiv, In Verhandlung, Getauscht)
- E-Mail-Bestätigung für wichtige Aktionen

### Suche und Filter
- Fortgeschrittene Filterfunktionen:
  - Preisrange (Warm/Kalt)
  - Zimmerzahl
  - Entfernung zur Dienststelle
  - Stockwerk
  - Parkplatz
  - Möbliert/Unmöbliert

### Ansichten
- Responsive Listenansicht mit Sortieroptionen
- Interaktive Kartenansicht mit Clustern
- Detailansicht mit Cloudinary-Bildergalerie

## 4. Datenmodell

```prisma
model User {
  id            String      @id @default(cuid())
  email         String      @unique
  emailVerified DateTime?
  name          String?
  dienststelle  Dienststelle
  wohnungen     Wohnung[]
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model Wohnung {
  id              String      @id @default(cuid())
  erstelltAm      DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  adresse         String
  plz             String
  stadt           String
  etage           Int
  zimmer          Int
  groesse         Float
  kaltmiete       Float
  warmmiete       Float
  parkplatz       Boolean
  moebliert       Boolean
  heizungsart     String
  bilder          Bild[]     @relation("WohnungBilder")
  status          Status      @default(AKTIV)
  user            User        @relation(fields: [userId], references: [id])
  userId          String
  latitude        Float?
  longitude       Float?

  @@index([userId])
}

model Bild {
  id              String    @id @default(cuid())
  cloudinaryId    String
  cloudinaryUrl   String
  wohnung         Wohnung   @relation("WohnungBilder", fields: [wohnungId], references: [id])
  wohnungId       String

  @@index([wohnungId])
}

enum Status {
  AKTIV
  IN_VERHANDLUNG
  GETAUSCHT
}

enum Dienststelle {
  BERLIN
  SCHWIELOWSEE
}
```

## 5. UI/UX-Konzept

### Hauptansichten
1. Landing Page
   - Login via Magic Link
   - Kurze Erklärung des Services

2. Wohnungen
   - Übersichtskarte
   - Filterleiste
   - Toggle zwischen Listen- und Kartenansicht

3. Detailansicht
   - Cloudinary-Bildergalerie
   - Alle Wohnungsdetails
   - Kontaktinformationen
   - Entfernungsanzeige zur jeweiligen Dienststelle

4. Verwaltungsbereich => kein eigenes Dashboard, Nutzer bekommt in seiner eigenen Anzeige die Möglichkeit, diese zu bearbeiten oder zu löschen
   - Eigene Anzeigen verwalten
   - Status ändern
   - Anzeigen löschen

## 6. Entwicklungsphasen

### Phase 1: Setup & Grundstruktur (1-2 Wochen)
- Next.js Projekt aufsetzen
- Vercel Postgres einrichten
- Prisma Schema implementieren
- Authentication mit Magic Links
- Basic Layout mit shadcn/ui

### Phase 2: Core Features (2-3 Wochen)
- CRUD-Operationen für Wohnungen
- Cloudinary Integration
- Bildupload mit Preview
- Basis-Listenansicht
- Filter-Logik

### Phase 3: Erweiterte Funktionen (2-3 Wochen)
- Kartenintegration mit Leaflet
- Erweiterte Suche
- Status-Management
- E-Mail-Benachrichtigungen
- Responsive Design

### Phase 4: Polishing & Launch (1-2 Wochen)
- Performance-Optimierung
- SEO
- Error Handling
- Testing
- Deployment auf Vercel

## 7. Sicherheitsaspekte
- Magic Link Authentication
- Rate Limiting für API-Routes
- Validierung aller Formulareingaben
- Secure Headers
- Cloudinary Upload-Presets
- XSS-Schutz
- CSRF-Token

## 8. Erweiterungsmöglichkeiten
- Automatische Matching-Vorschläge
- Push-Benachrichtigungen
- Chatfunktion
- Statistiken über erfolgreiche Tausche
- Integration weiterer Dienststellen

## 9. Potenzielle Herausforderungen
- Optimierung der Bildverarbeitung
- Performance bei vielen gleichzeitigen Nutzern
- Kartenperformance bei vielen Markern
- Skalierung der Datenbank

## 10. Nächste Schritte
1. Einrichten der Entwicklungsumgebung
2. Setup von Vercel & Cloudinary Accounts
3. Implementierung der Authentication
4. Erstellung eines Basic Prototyps
