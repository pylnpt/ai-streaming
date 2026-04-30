import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adatvédelmi tájékoztató | StreamWithAI",
  description: "Adatkezelési tájékoztató a Szolgáltatás használatához",
};

const EFFECTIVE_DATE = "2026. április 29.";

const PrivacyPage = () => {
  return (
    <article className="space-y-6 text-foreground">
      <header className="space-y-2 border-b border-border pb-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Jogi tájékoztató
        </p>
        <h1 className="text-3xl font-bold">Adatvédelmi tájékoztató</h1>
        <p className="text-sm text-muted-foreground">
          Hatályos: {EFFECTIVE_DATE}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Az adatkezelő</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A jelen tájékoztató a StreamWithAI (a továbbiakban: <strong>Szolgáltatás</strong>)
          használata során megvalósuló személyes adatkezelést mutatja be. A
          Szolgáltatás az Eszterházy Károly Katolikus Egyetem (EKKE)
          szakdolgozati keretében készült, demonstrációs jellegű alkalmazás. Az
          adatkezelést a fejlesztő szakdolgozó (a továbbiakban: <strong>Adatkezelő</strong>)
          végzi.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. A kezelt adatok köre és célja</h2>
        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Adatkör</th>
                <th className="px-3 py-2 text-left font-medium">Cél</th>
                <th className="px-3 py-2 text-left font-medium">Jogalap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-3 py-2 align-top">Felhasználónév, e-mail cím, jelszó (bcrypt hash)</td>
                <td className="px-3 py-2 align-top">Felhasználói fiók létrehozása, hitelesítés</td>
                <td className="px-3 py-2 align-top">GDPR 6. cikk (1) b) – szerződés teljesítése</td>
              </tr>
              <tr>
                <td className="px-3 py-2 align-top">Profilkép, bio</td>
                <td className="px-3 py-2 align-top">Nyilvános profil megjelenítése</td>
                <td className="px-3 py-2 align-top">GDPR 6. cikk (1) a) – hozzájárulás</td>
              </tr>
              <tr>
                <td className="px-3 py-2 align-top">Stream metaadatok (név, thumbnail, kulcs)</td>
                <td className="px-3 py-2 align-top">Élő közvetítés szolgáltatása</td>
                <td className="px-3 py-2 align-top">GDPR 6. cikk (1) b) – szerződés teljesítése</td>
              </tr>
              <tr>
                <td className="px-3 py-2 align-top">Chat üzenetek és kiszűrt üzenetek (FilteredMessage)</td>
                <td className="px-3 py-2 align-top">Moderáció, naplózás, statisztika</td>
                <td className="px-3 py-2 align-top">GDPR 6. cikk (1) f) – jogos érdek (biztonságos chat)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 align-top">AI-szűrő beállítások (küszöb, kategóriák, egyedi szólisták)</td>
                <td className="px-3 py-2 align-top">Személyre szabott moderáció</td>
                <td className="px-3 py-2 align-top">GDPR 6. cikk (1) a) – hozzájárulás</td>
              </tr>
              <tr>
                <td className="px-3 py-2 align-top">OAuth-azonosítók (Google, GitHub – ha használja)</td>
                <td className="px-3 py-2 align-top">Külső szolgáltatóval való bejelentkezés</td>
                <td className="px-3 py-2 align-top">GDPR 6. cikk (1) b) – szerződés teljesítése</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Adatfeldolgozók (harmadik felek)</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Szolgáltatás működéséhez az alábbi külső szolgáltatókat veszi
          igénybe. Az adatok továbbítása a szolgáltatás nyújtása érdekében
          szükséges:
        </p>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
          <li><strong>Neon (PostgreSQL hoszting)</strong> – adatbázis-tárolás (USA, AWS us-east-1).</li>
          <li><strong>LiveKit Cloud</strong> – élő videó- és audió-stream továbbítás.</li>
          <li><strong>UploadThing</strong> – képek (profilkép, thumbnail) tárolása.</li>
          <li><strong>Google / GitHub</strong> – OAuth bejelentkezés (csak ha a Felhasználó ezt választja).</li>
          <li><strong>TensorFlow.js</strong> – a toxicity-modell <em>kliensoldalon</em> fut, a chat üzenetek elhagyják a böngészőt csak akkor, ha a moderáción átmentek.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Adattárolás időtartama</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Mivel a Szolgáltatás demonstrációs jellegű, az adatok a fiók törléséig,
          illetve a szakdolgozati projekt befejezéséig kerülnek megőrzésre. A
          Felhasználó bármikor kérheti adatainak törlését (lásd 6. pont).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Adatbiztonság</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A jelszavakat az Adatkezelő nem nyílt szövegként, hanem bcrypt
          hash-elt formában tárolja. Az adatbázis-kapcsolat TLS-en keresztül
          (sslmode=require) történik. A munkamenetek JWT-alapúak (NextAuth.js
          v5), külön titkos kulccsal aláírva.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Az érintett jogai</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A GDPR alapján a Felhasználó az alábbi jogokkal élhet:
        </p>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
          <li>tájékoztatás és hozzáférés joga (GDPR 15. cikk);</li>
          <li>helyesbítés joga (16. cikk);</li>
          <li>törlés („elfeledtetés&rdquo;) joga (17. cikk);</li>
          <li>adatkezelés korlátozása (18. cikk);</li>
          <li>adathordozhatóság joga (20. cikk);</li>
          <li>tiltakozás joga (21. cikk);</li>
          <li>hozzájárulás visszavonásának joga (7. cikk).</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Ezen jogok gyakorlására irányuló kérelmét a Felhasználó az
          Adatkezelőhöz nyújthatja be a fiókja kapcsolattartási e-mail
          címén keresztül.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Felügyeleti hatóság</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Adatvédelmi panaszával a Nemzeti Adatvédelmi és Információszabadság
          Hatóságához (NAIH) fordulhat:
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          1055 Budapest, Falk Miksa utca 9-11. · Web:{" "}
          <a
            href="https://naih.hu"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline hover:no-underline"
          >
            naih.hu
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. A tájékoztató módosítása</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Az Adatkezelő fenntartja a jogot a jelen tájékoztató módosítására. A
          mindenkor hatályos verzió ezen az oldalon érhető el; jelentős
          változás esetén a Felhasználót a Szolgáltatás felületén tájékoztatjuk.
        </p>
      </section>
    </article>
  );
};

export default PrivacyPage;
