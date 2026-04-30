import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ÁSZF | StreamWithAI",
  description: "Általános Szerződési Feltételek",
};

const EFFECTIVE_DATE = "2026. április 29.";

const TermsPage = () => {
  return (
    <article className="space-y-6 text-foreground">
      <header className="space-y-2 border-b border-border pb-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Jogi tájékoztató
        </p>
        <h1 className="text-3xl font-bold">Általános Szerződési Feltételek</h1>
        <p className="text-sm text-muted-foreground">
          Hatályos: {EFFECTIVE_DATE}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Bevezető rendelkezések</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A jelen Általános Szerződési Feltételek (a továbbiakban: <strong>ÁSZF</strong>)
          a StreamWithAI (a továbbiakban: <strong>Szolgáltatás</strong>) használatának
          feltételeit szabályozzák. A Szolgáltatás az Eszterházy Károly Katolikus
          Egyetem (EKKE) szakdolgozati keretében készült, demonstrációs célú élő
          streaming platform, amely AI-alapú chat-tartalommoderációt valósít meg.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Szolgáltatás regisztrációjával vagy használatával a Felhasználó a jelen
          ÁSZF-et magára nézve kötelezőnek ismeri el.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. A Szolgáltatás tárgya</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Szolgáltatás lehetővé teszi a Felhasználók számára, hogy élő videós
          tartalmat sugározzanak (LiveKit infrastruktúrán keresztül), illetve, hogy
          valós idejű chatben kommunikáljanak. A chat üzenetek hibrid (kliensoldali
          AI + szabályalapú) tartalommoderáción esnek át.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Szolgáltatás <strong>nem kereskedelmi célú</strong>, oktatási
          demonstráció. Az Üzemeltető nem garantálja a folyamatos elérhetőséget,
          rendelkezésre állást, sem az adatok hosszú távú megőrzését.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Regisztráció, felhasználói fiók</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Szolgáltatás bizonyos funkcióinak (streamelés, chat, beállítások)
          használatához regisztráció szükséges. A regisztráció során megadott
          adatokért — beleértve a felhasználónevet, e-mail címet és jelszót — a
          Felhasználó felelős. A jelszó biztonságos tárolásáért az Üzemeltető a
          tudomány jelenlegi állása szerinti módon (bcrypt hash) felel.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Felhasználó vállalja, hogy a fiókját más személyre át nem ruházza, és
          a hozzáférési adatait harmadik féllel nem osztja meg.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Felhasználói tartalom</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Felhasználó által létrehozott tartalmakért (élő videó, chat üzenetek,
          profilkép, bio, egyedi szólisták) kizárólag a Felhasználó felel. A
          Felhasználó szavatolja, hogy a feltöltött tartalom nem sérti harmadik
          felek jogait, sem a hatályos magyar és uniós jogszabályokat.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Szolgáltatás működése során a chat üzeneteket egy AI-modell
          (TensorFlow.js / @tensorflow-models/toxicity) értékeli a böngésző
          oldalán. A toxikusnak minősített üzeneteket a rendszer naplózza
          (FilteredMessage tábla), és — a stream tulajdonosának beállításai
          szerint — vissza is állíthatja.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Tilos használat</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Tilos a Szolgáltatást olyan célra használni, amely:
        </p>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
          <li>jogszabályba vagy jó erkölcsbe ütközik;</li>
          <li>mások személyiségi jogait sérti (becsület, jó hírnév, magántitok);</li>
          <li>gyűlöletkeltő, fenyegető vagy zaklató tartalmat közvetít;</li>
          <li>szerzői jogi védelem alatt álló művek jogosulatlan terjesztését valósítja meg;</li>
          <li>a Szolgáltatás technikai működésének megzavarására irányul (pl. DoS, scraping a moderáció kikerülésére).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Felelősség korlátozása</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A Szolgáltatás „as is&rdquo; — adott állapotában — érhető el. Az Üzemeltető
          kizárja a felelősségét minden olyan kárért, amely a Szolgáltatás
          használatából, esetleges leállásából, adatvesztésből vagy a moderáció
          téves működéséből ered. A Felhasználó a Szolgáltatást saját felelősségére
          használja.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Az ÁSZF módosítása</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Az Üzemeltető jogosult a jelen ÁSZF-et bármikor egyoldalúan módosítani.
          A módosításról a Felhasználót a Szolgáltatás felületén tájékoztatja. A
          módosítás hatálybalépését követő használat a módosított ÁSZF
          elfogadásának minősül.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Záró rendelkezések</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A jelen ÁSZF-re a magyar jog az irányadó. A jelen ÁSZF-ben nem
          szabályozott kérdésekben a Polgári Törvénykönyvről szóló 2013. évi V.
          törvény, valamint az elektronikus kereskedelmi szolgáltatásokról szóló
          2001. évi CVIII. törvény rendelkezései az irányadók.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A személyes adatok kezeléséről részletesen az{" "}
          <a href="/privacy" className="text-primary underline hover:no-underline">
            Adatvédelmi tájékoztató
          </a>{" "}
          rendelkezik.
        </p>
      </section>
    </article>
  );
};

export default TermsPage;
