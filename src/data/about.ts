export type BoardMember = { role: string; name: string; year: string; emails: string[] };
export type Committee  = { navn: string; beskrivelse: string; kontakt: string; rolle: string; email: string };
export type Vedtekt    = { par: string; title: string; body: string };

export const boardMembers: BoardMember[] = [
  { role: "Leder",                             name: "Stian Haugen",            year: "3. år · Dataingeniør",                              emails: ["leder@ditio.org"] },
  { role: "Nestleder og økonomiansvarlig",     name: "Umeshgaar Bala",          year: "3. år · Matematisk modellering og datavitenskap",    emails: ["nestleder@ditio.org", "okonomi@ditio.org"] },
  { role: "IT- og driftsansvarlig",            name: "Fabian Mihle Hansen",     year: "3. år · Dataingeniør",                              emails: ["it@ditio.org"] },
  { role: "Arrangementansvarlig",              name: "Jonas Hazeland Baugerud", year: "2. år · Dataingeniør",                              emails: ["event@ditio.org", "bedrift@ditio.org"] },
  { role: "Mediaansvarlig",                    name: "Elim Misgun Ghessesew",   year: "2. år · Dataingeniør",                              emails: ["pr@ditio.org"] },
  { role: "Styremedlem",                       name: "Emma Agnethe Rasch Eldby",year: "3. år · Anvendt datateknologi",                     emails: [] },
  { role: "Styremedlem",                       name: "Philip Lo",               year: "1. år · Anvendt datateknologi",                     emails: [] },
  { role: "Styremedlem",                       name: "Per Erik Gronvik",        year: "3. år · Matematisk modellering og datavitenskap",    emails: [] },
];

export const komiteer: Committee[] = [
  {
    navn: "Event-komité",
    beskrivelse: "Bidrar til planlegging, rigging og gjennomføring av Ditios arrangementer, alt fra faglige samlinger til sosiale aktiviteter. Komiteen sørger for at arrangementene blir engasjerende og inkluderende.",
    kontakt: "Jonas Hazeland Baugerud", rolle: "Arrangementansvarlig", email: "event@ditio.org",
  },
  {
    navn: "IT-komité",
    beskrivelse: "Har ansvar for å utvikle, vedlikeholde og drifte foreningens tekniske løsninger — nettsiden, interne systemer og digitale prosjekter. Komiteen fungerer som Ditios eget utviklingsteam og samarbeider tett med styret.",
    kontakt: "Fabian Mihle Hansen", rolle: "IT- og driftsansvarlig", email: "it@ditio.org",
  },
  {
    navn: "Tillitsvalgt-komité",
    beskrivelse: "Samler alle tillitsvalgte ved institutt for IT slik at de kan dele erfaringer, diskutere saker og samarbeide om hvordan rollene deres kan fungere best mulig. Et forum for støtte og erfaringsutveksling mellom nye og erfarne tillitsvalgte.",
    kontakt: "Emma Eldby", rolle: "Styremedlem", email: "styremedlem1@ditio.org",
  },
  {
    navn: "ACIT-komité",
    beskrivelse: "Består av masterstudenter fra ACIT-programmet og fungerer som bindeledd mellom masterstudentene og Ditio. Representerer masterstudentenes interesser og bidrar til å tilrettelegge aktiviteter for mastermiljøet.",
    kontakt: "Jonas Hazeland Baugerud", rolle: "Arrangementansvarlig", email: "event@ditio.org",
  },
];

export const vedtekter: Vedtekt[] = [
  { par: "§1",   title: "Foreningens navn",                          body: "Foreningens navn er Ditio - linjeforening, videre kalt Ditio." },
  { par: "§2",   title: "Formål",                                    body: "Ditio sitt formål å være en sosial og faglig forening for foreningens medlemmer, som er studentene ved institutt IT ved fakultet for TKD på OsloMet og andre interessenter." },
  { par: "§3",   title: "Organisasjonsform",                         body: "Ditio er en frivillig studentorganisasjon og ble stiftet 06.06.2025. Foreningen er en frittstående juridisk forening med medlemmer og er selveiende. At den er selveiende innebærer at ingen, verken medlemmer eller andre, har krav på foreningens formue eller eiendeler, eller er ansvarlig for gjeld eller andre." },
  { par: "§4",   title: "Medlemmer",                                 body: "Minimum 80 % av foreningens medlemmer må være nåværende studenter ved et SiO-registrert lærested, og minst 50 % av medlemmene må være semesterregistrert ved OsloMet gjeldende semester. Utover dette er foreningen åpen for andre interesserte." },
  { par: "§4.1", title: "Rettigheter og plikter knyttet til medlemskapet", body: "Alle medlemmer har rett til å delta på foreningens arrangementer, de har stemmerett på generalforsamlingen og er de eneste som er valgbare til verv i foreningen. Medlemmene plikter å forholde seg til vedtak som er fattet av generalforsamlingen. Dette inkluderer vedtekter, retningslinjer og enkeltvedtak." },
  { par: "§5",   title: "Vedtekter og retningslinjer",               body: "Vedtektene er det øverste styringsdokument til foreningen. Generalforsamlingen kan vedta retningslinjer som supplerer eller utbroderer vedtektene. Styret har ansvaret for at medlemmene er kjent med de gjeldende dokumentene." },
  { par: "§6",   title: "Generalforsamling",                         body: "Generalforsamlingen er foreningens øverste organ. Den skal holdes minimum én gang i året, helst i september, men innen utgangen av oktober i høstsemesteret. Generalforsamling fatter vedtak ved simpelt flertall. Ingen medlemmer har mer enn én stemme og stemmegivning kan ikke skje ved fullmakt. Innkalling skal være medlemmene i hende minimum to uker før, og sakspapirer én uke før. Vedtektsendringer krever 2/3 flertall av oppmøtte." },
  { par: "§6.1", title: "Generalforsamlingens oppgaver",             body: "Generalforsamlingen skal behandle styrets beretning, regnskap fra forrige år, budsjett for kommende år, etiske retningslinjer, varslingsretningslinjer og varslingsplakat, innkomne forslag, vedtekter og gjennomføre valg." },
  { par: "§6.2", title: "Ekstraordinær generalforsamling",           body: "Ekstraordinær generalforsamling kan innkalles hvis minimum 1/3 av medlemmene krever det eller styret finner det nødvendig." },
  { par: "§7",   title: "Valg",                                      body: "Det velges nytt styre på generalforsamling. Hvert styremedlem velges for én periode av gangen. Alle valg foretas ved skriftlig votering dersom det ikke fremsettes forslag om annet. Styremedlemmer velges med simpelt flertall. Ved likt resultat avholdes ny avstemning mellom de to med flest stemmer." },
  { par: "§8",   title: "Styret",                                    body: "Ditio består av et styre på 8 personer. 80 % av styret må være semesterregistrerte studenter ved et av SiOs studiesteder. Minimum 50 % av styrets medlemmer må være semesterregistrert ved OsloMet. Alle styreverv i Ditio er ulønnet." },
  { par: "§8.1", title: "Styremøter",                                body: "Styret er beslutningsdyktige når 2/3 av styremedlemmene er til stede. Saker vedtas ved simpelt flertall. Ved stemmelikhet har leder dobbeltstemme." },
  { par: "§9",   title: "Komiteer",                                  body: "Styret har mulighet til å opprette egne komiteer med formål å løse oppgaver satt frem av styret. Hver komité skal ha en dedikert kontaktperson i styret. Forslag om opprettelse skal godkjennes ved kvalifisert flertall. Etter at nytt styre er satt stemmes det over videreføring av eksisterende komiteer på første styremøte." },
  { par: "§10",  title: "Økonomi",                                   body: "Foreningens midler skal kun brukes i henhold til foreningens formål. Det skal alltid foreligge budsjett og regnskap med tilhørende bilag. Utbetalinger skal godkjennes av leder og økonomiansvarlig. Ved stemming over økonomiske investeringer trengs 2/3 flertall i styret." },
  { par: "§10.1",title: "Signaturrett",                              body: "Styrets leder, eller nestleder i dens fravær, sammen med arrangementsansvarlig har signaturrett på vegne av foreningen ved avtaler med eksterne parter." },
  { par: "§11",  title: "Etikk og varsling",                         body: "Foreningen skal vurdere miljømessige og etiske hensyn i planleggingen av aktiviteter. Kritikkverdige forhold kan varsles i henhold til varslingsrutiner. Varsling som gjelder et styremedlem behandles av ekstraordinær generalforsamling. Foreningen skal ha oppdatert varslingsplakat, varslingsrutiner og etiske retningslinjer." },
  { par: "§12",  title: "Sanksjoner",                                body: "Ved brudd på norsk lov, foreningens vedtekter eller retningslinjer kan styret ilegge sanksjoner. Dette kan inkludere advarsler, midlertidig suspensjon eller eksklusjon. Alle sanksjoner besluttes med minst 2/3 kvalifisert flertall og kan ankes til generalforsamling." },
  { par: "§13",  title: "Mistillit",                                 body: "Forslag om mistillit kan fremmes av medlemmer og skal begrunnes skriftlig til styret. All behandling er taushetsbelagt. Mistillit vedtas med 3/4 kvalifisert flertall. Gjelder forslaget et styremedlem, legges saken frem for generalforsamlingen. Den saken gjelder har rett til å forklare seg før beslutning fattes." },
  { par: "§14",  title: "Oppløsning",                                body: "Foreningen kan oppløses ved at 2/3 av stemmeberettigede på generalforsamlingen stemmer for det. Sak om oppløsning må meldes innen ordinære saksfrister. Ved opphør vil foreningens midler gis til en annen egnet studentforening som generalforsamlingen bestemmer." },
];
