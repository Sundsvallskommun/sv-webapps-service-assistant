# Redaktörsguide för Service assistant i Sitevision

Den här guiden beskriver hur du som Sitevision-redaktör lägger till och
ställer in Service assistant på en sida. Namn på menyer och knappar kan skilja
sig något mellan olika Sitevision-versioner och behörighetsnivåer.

## Innan du börjar

Kontrollera att:

- webbappen **Service assistant** är installerad i Sitevision-miljön,
- du har behörighet att redigera sidan och webbappsmodulen,
- du har fått **Assistentens ID** och **Applikation** från den som administrerar
  proxyn,
- en administratör har ställt in rätt URL till proxyn i webbappens globala
  inställningar.

Sitevision-appen kommunicerar inte direkt med Eneo. Anropen går via en proxy
som i sin tur kommunicerar med Eneo. Sitevision-inställningarna måste därför
stämma överens med konfigurationen i proxyn.

## Lägg till assistenten på en sida

1. Öppna sidan i Sitevisions redigeringsläge.
2. Lägg till webbappsmodulen **Service assistant** på sidan.
3. Öppna modulens inställningar.
4. Gör inställningarna enligt avsnitten nedan och spara.
5. Förhandsgranska sidan och skicka en testfråga.
6. Publicera sidan när allt fungerar och kontrollera även den publicerade
   sidan.

## Redaktionellt innehåll

Under **Redaktionellt** ställer du in det innehåll som visas runt chatten.

### Rubriker

- **Rubrik** är modulens huvudrubrik.
- **Rubriknivå** ska följa sidans rubrikhierarki. Använd normalt inte `h1` om
  sidan redan har en huvudrubrik.
- **Underrubrik** visas i anslutning till huvudrubriken.
- **Etikett** beskriver frågefältet, exempelvis "Ställ en fråga till vår
  AI-assistent".

### Läs mer-länk

Du kan komplettera assistenten med en kort text och en länk till mer
information. Ange både **Länktext** och **Länk (url)** för att länken ska
visas. Kontrollera att länken fungerar och är begriplig även utan sitt
sammanhang.

### Fördefinierade frågor

Aktivera **Använd fördefinierade frågor** om besökaren ska få förslag på
frågor.

1. Skriv en rubrik för frågeförslagen.
2. Välj hur många frågor som ska visas.
3. Fyll i motsvarande frågefält.

Skriv korta frågor som representerar vanliga behov. Testa varje fråga mot
assistenten innan sidan publiceras.

## Assistentens inställningar

Under **Assistent > Inställningar** kopplar du modulen till rätt assistent.

- **Assistentens ID**: ska exakt matcha assistent-ID:t som är konfigurerat i
  proxyn.
- **Gruppchatt**: aktivera endast om den aktuella assistenten är konfigurerad
  för gruppchatt.
- **Applikation**: ska exakt matcha applikationsnamnet som är konfigurerat i
  proxyn.
- **Behåll session vid navigering**: bevarar konversationen när besökaren
  navigerar mellan sidor där assistenten används.
- **Visa referenser i chattflödet**: visar de källor som assistentens svar
  hänvisar till.
- **Sessionsnamn**: identifierar sessionen. Använd samma namn på moduler som
  ska dela konversation och olika namn på moduler som ska ha separata
  konversationer.

Under **Assistent-information**, **Användarinformation** och
**Systemanvändarinformation** kan du ställa in namn, avatar, initialer,
avatarfärg och om namnet ska visas i chattflödet. Systemanvändaren används
bland annat för felmeddelanden och kan antingen visas som assistenten eller med
ett eget utseende.

Välj slutligen **Primär** eller **Sekundär** version. Valet styr vilken av de
två globalt konfigurerade utseendevarianterna som modulen använder.

## Använd metadata

De flesta modulinställningar kan hämta sitt värde från sidmetadata.

1. Markera **Använd metadata** vid det aktuella fältet.
2. Välj den metadata som innehåller värdet.
3. Kontrollera resultatet på minst en sida där metadata har ett värde och en
   sida där värdet saknas.

När metadata är aktiverat används metadatavärdet om det är giltigt. Om det
saknas eller inte kan användas faller modulen tillbaka på det manuellt angivna
värdet. Behåll därför ett lämpligt standardvärde i fältet när det är
praktiskt.

## Globala inställningar

De globala inställningarna gäller alla instanser av webbappen i den aktuella
Sitevision-miljön och hanteras normalt av en administratör. Där finns bland
annat:

- **URL till AI-server**, som ska peka på organisationens proxy till Eneo,
- avancerade val för strömmande svar, Shadow DOM och användarinformation,
- typsnitt, basfontstorlek, brytpunkt och färgläge,
- separata utseendeinställningar för primär och sekundär version.

Kontakta en Sitevision-administratör om dessa inställningar saknas eller om du
inte har behörighet att ändra dem.

## Kontroll efter konfigurering

Kontrollera följande både i förhandsgranskningen och på den publicerade sidan:

- rubriknivån passar in i sidans rubrikhierarki,
- rubrik, etikett och fördefinierade frågor är begripliga,
- en testfråga ger svar från rätt assistent,
- referenser och läs mer-länk fungerar,
- konversationen behålls eller nollställs enligt vald sessionsinställning,
- modulen fungerar i både smal och bred vy.

## Felsökning

### CORS-fel eller anrop till proxyn blockeras

Vanliga tecken är att assistenten visas men inte svarar, eller att webbläsarens
utvecklarverktyg visar fel som innehåller `CORS`, `blocked by CORS policy` eller
`Access-Control-Allow-Origin`.

Kontrollera i den här ordningen:

1. Öppna sidan där felet uppstår och ta fram sidans exakta origin. En origin
   består av protokoll, värdnamn och eventuell port, till exempel
   `https://www.exempel.se` eller `https://test.exempel.se:8443`. Sökväg och
   avslutande snedstreck ska inte ingå.
2. Kontrollera fältet **Host/Värd** i proxyn. Den origin som Sitevision-sidan
   faktiskt använder måste vara inlagd där som en tillåten origin, inklusive
   `http`/`https`, eventuell underdomän och port.
3. Kontrollera vilken Sitevision-miljö du använder. Redigeringsläge,
   förhandsgranskning, test och produktion kan använda olika domäner och kan
   därför behöva var sin **Host/Värd** i proxyn.
4. Kontrollera webbappens globala **URL till AI-server** i just den
   Sitevision-miljön. URL:en ska peka på proxyn. Test- och produktionsmiljöer
   kan ha olika proxy-URL:er.
5. Ladda om sidan och testa igen. Om inställningen nyligen ändrades, kontrollera
   även i ett privat webbläsarfönster för att utesluta cachad information.

Lägg bara till kända Sitevision-domäner som **Host/Värd** i proxyn. Använd
inte jokertecknet `*` som en generell lösning. Om problemet kvarstår, skicka
sidans origin, den konfigurerade proxy-URL:en, miljöns namn samt hela
felmeddelandet från webbläsarens konsol till administratören.

### Assistenten visas men svarar inte

- Kontrollera att **Assistentens ID** och **Applikation** exakt matchar ID och
  applikationsnamn i proxyn.
- Kontrollera att proxy-URL:en är ifylld under den globala inställningen
  **URL till AI-server**.
- Kontrollera webbläsarens konsol och nätverksflik. Vid CORS-fel, följ stegen
  ovan.

### Fel innehåll eller fel assistent visas

- Kontrollera att modulens **Assistentens ID** och **Applikation** matchar
  konfigurationen i proxyn.
- Om **Använd metadata** är aktiverat, kontrollera värdet på den aktuella
  sidan och modulens manuella reservvärde.
- Kontrollera **Sessionsnamn** om flera assistenter finns på webbplatsen och
  sessioner ska hållas isär.

### Ändringen syns inte

- Spara modulinställningen och publicera sidan på nytt.
- Kontrollera att du tittar på rätt Sitevision-miljö och rätt sidversion.
- Prova att ladda om sidan utan cache eller använd ett privat
  webbläsarfönster.
