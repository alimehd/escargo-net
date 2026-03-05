import './App.css'

function App() {
  return (
    <div className="site-wrapper">

      {/* ═══ MARQUEE BANNER ═══ */}
      <div className="marquee-bar">
        <div className="marquee-content">
          ★ BIENVENUE AU ES-CARGO 545 ★ CHERTSEY, QUÉBEC ★ EARTHSHIP OFF-GRID DEPUIS 2004 ★ ON RECRUTE ★ INGÉNIEURS ★ ARTISTES ★ PUNKS ★ RÊVEURS ★ BÂTISSEURS ★ REJOINS-NOUS ★ BIENVENUE AU ES-CARGO 545 ★ CHERTSEY, QUÉBEC ★ EARTHSHIP OFF-GRID DEPUIS 2004 ★ ON RECRUTE ★ INGÉNIEURS ★ ARTISTES ★ PUNKS ★ RÊVEURS ★ BÂTISSEURS ★ REJOINS-NOUS ★
        </div>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="main-header">
        <div className="snail-ascii">
{`
    /\\  /\\
   /  \\/  \\     _____
  | ES-CARGO |  / 545 /
   \\  ____  / /     /
    \\|    |/ /_____/
     @    @
    /|    |\\
   (_|    |_)  ~~ off-grid depuis 2004 ~~
`}
        </div>
        <h1 className="glitch" data-text="ES-CARGO 545">ES-CARGO 545</h1>
        <h2 className="subtitle">EARTHSHIP QUÉBÉCOIS ★ CHERTSEY, QC</h2>
        <p className="tagline blink-slow">
          「 15 ACRES DE FORÊT ★ 100% OFF-GRID ★ ZONE 3 ★ PUNK AS FUCK 」
        </p>
        <div className="hr-punk">═══════════════════════════════════════════════</div>
      </header>

      {/* ═══ WHAT IS THIS PLACE ═══ */}
      <section className="section-box">
        <h3 className="section-title">// C'EST QUOI CET ENDROIT?</h3>
        <div className="two-col">
          <div className="col">
            <p>
              <span className="highlight">ES-CARGO</span> = <strong>E</strong>arth<strong>S</strong>hip + 
              CARGO (naviguer à travers la crise) + ESCARGOT (on porte notre maison sur le dos). 
              Fondé en 2004 par une gang de têtes dures off-grid sur une pente exposée plein sud 
              à <span className="highlight">Chertsey, Québec</span>.
            </p>
            <p>
              Une maison construite de <span className="neon-green">pneus recyclés remplis de terre</span>, 
              de grandes fenêtres orientées sud, alimentée par le soleil, l'eau de source par gravité, 
              et la pure volonté punk de vivre autrement.
            </p>
          </div>
          <div className="col stats-box">
            <ul className="stats-list">
              <li>☀️ ÉNERGIE SOLAIRE</li>
              <li>💧 EAU DE SOURCE PAR GRAVITÉ</li>
              <li>🔥 ROCKET STOVE MAISON</li>
              <li>🧊 GLACIÈRE ARTISANALE (jan→juil)</li>
              <li>🚽 TOILETTE À COMPOST</li>
              <li>🐔 POULES & AQUAPONIE</li>
              <li>🌲 15 ACRES DE FORÊT NOURRICIÈRE</li>
              <li>⛽ ~200 LBS PROPANE/AN (eau chaude)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ VISITOR COUNTER ═══ */}
      <div className="visitor-counter">
        <img src="https://hitwebcounter.com/counter/counter.php?page=not_real&style=006&nbdigits=7&type=page&initCount=13337" alt="visitor counter" onError={(e) => { e.target.style.display = 'none' }} />
        <span className="counter-text">
          ◄ VOUS ÊTES LE VISITEUR #{Math.floor(Math.random() * 90000 + 13337)} ►
        </span>
      </div>

      {/* ═══ MANIFESTO ═══ */}
      <section className="section-box manifesto">
        <h3 className="section-title">// MANIFESTE</h3>
        <div className="manifesto-text">
          <p className="big-text">LE SYSTÈME EST BRISÉ.</p>
          <p>
            Pendant que le monde brûle du pétrole pour chauffer des boîtes en carton, 
            on construit avec les déchets de la société. Des pneus. De la terre. Du verre. 
            Du bois mort.
          </p>
          <p className="big-text">ON N'ATTEND PAS LA PERMISSION.</p>
          <p>
            La forêt nourricière pousse. Les systèmes fonctionnent. L'eau coule par gravité. 
            Le soleil charge les batteries. La glace de janvier garde la bouffe fraîche jusqu'en juillet.
            <span className="blink-slow"> C'EST POSSIBLE.</span>
          </p>
          <p className="big-text neon-green">ON A BESOIN DE TOI.</p>
        </div>
      </section>

      {/* ═══ UNDER CONSTRUCTION GIF ═══ */}
      <div className="construction-banner">
        <span>🚧</span>
        <span className="blink-fast">PAGE EN CONSTRUCTION ÉTERNELLE</span>
        <span>🚧</span>
      </div>

      {/* ═══ RECRUITMENT ═══ */}
      <section className="section-box recruitment">
        <h3 className="section-title glitch-small" data-text="// ON RECRUTE !!!">// ON RECRUTE !!!</h3>
        
        <div className="recruit-grid">
          <div className="recruit-card">
            <div className="recruit-icon">⚙️</div>
            <h4>INGÉNIEUR·E·S</h4>
            <p>
              Systèmes solaires, aquaponie, rocket stoves, 
              captation d'eau, biodigestion... Si tu sais 
              faire marcher des trucs avec rien, on te veut.
            </p>
          </div>
          
          <div className="recruit-card">
            <div className="recruit-icon">🎨</div>
            <h4>ARTISTES</h4>
            <p>
              Murales, sculptures de récup, land art, 
              sérigraphie, musique, documentation... 
              Embellis notre coin de forêt.
            </p>
          </div>
          
          <div className="recruit-card">
            <div className="recruit-icon">🏴</div>
            <h4>PUNKS</h4>
            <p>
              T'en as marre du système? Tu sais te débrouiller 
              avec rien? Tu veux vivre autrement sans demander 
              la permission? T'ES CHEZ TOI.
            </p>
          </div>
          
          <div className="recruit-card">
            <div className="recruit-icon">🌱</div>
            <h4>PERMACULTURISTES</h4>
            <p>
              Food forests, compost, mycorhizes, 
              design régénératif... On transforme 15 acres 
              de forêt en buffet permanent.
            </p>
          </div>
          
          <div className="recruit-card">
            <div className="recruit-icon">🔨</div>
            <h4>BÂTISSEUR·EUSE·S</h4>
            <p>
              Éco-construction, tire-pounding, cordwood, 
              charpente, plomberie DIY... 
              Y'a toujours quelque chose à construire.
            </p>
          </div>
          
          <div className="recruit-card">
            <div className="recruit-icon">💀</div>
            <h4>RÊVEUR·EUSE·S</h4>
            <p>
              T'as pas de skills spécifiques mais t'as 
              le feu sacré? On s'en fout. Viens apprendre. 
              Viens essayer. Viens vivre.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ GUESTBOOK ═══ */}
      <section className="section-box guestbook">
        <h3 className="section-title">// LIVRE D'OR (GUESTBOOK)</h3>
        <div className="guestbook-entries">
          <div className="gb-entry">
            <span className="gb-name">@punk_du_plateau</span>
            <span className="gb-date">23/02/2026</span>
            <p>TABARNAK c'est MALADE ce spot. j'arrive cet été avec ma guitare et mes outils 🔥</p>
          </div>
          <div className="gb-entry">
            <span className="gb-name">@terre_vivante_qc</span>
            <span className="gb-date">15/01/2026</span>
            <p>Les humains derrière ce spot sont des légendes. La glacière artisanale m'a SOUFFLÉ l'esprit.</p>
          </div>
          <div className="gb-entry">
            <span className="gb-name">@xXx_solarpunk_xXx</span>
            <span className="gb-date">02/12/2025</span>
            <p>finally... a place where DIY isn't just aesthetic, it's SURVIVAL. respect from MTL ✊</p>
          </div>
        </div>
        <div className="gb-form-fake">
          <p className="blink-slow">[ FORMULAIRE BIENTÔT DISPONIBLE — EN ATTENDANT ÉCRIS-NOUS ]</p>
        </div>
      </section>

      {/* ═══ LINKS ═══ */}
      <section className="section-box links-section">
        <h3 className="section-title">// LIENS & RESSOURCES</h3>
        <div className="webring">
          <a href="https://permacultureglobal.org/projects/1928-es-cargo" target="_blank" rel="noopener noreferrer">
            ◄ Permaculture Global ►
          </a>
          <a href="https://earthship.com/" target="_blank" rel="noopener noreferrer">
            ◄ Earthship Biotecture ►
          </a>
          <a href="https://www.youtube.com/watch?v=qve0U_t7KL0" target="_blank" rel="noopener noreferrer">
            ◄ Vidéo: 11 ans Off-Grid ►
          </a>
          <a href="https://www.facebook.com/ESCargoQc" target="_blank" rel="noopener noreferrer">
            ◄ Facebook: ESCargoQc ►
          </a>
        </div>
        <div className="webring-badge">
          <p>⟨ WEBRING: EARTHSHIP QUÉBEC ⟩</p>
          <span>[ ◄ PRÉCÉDENT ]</span>
          <span>[ ALÉATOIRE ]</span>
          <span>[ SUIVANT ► ]</span>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="main-footer">
        <div className="hr-punk">═══════════════════════════════════════════════</div>
        <div className="footer-ascii">
{`
   __________
  |  ______  |    ES-CARGO 545
  | |      | |    Chertsey, QC
  | | FREE | |    Territoire non-cédé
  | |______| |    Kanien'kehá:ka
  |__________|
`}
        </div>
        <p className="footer-text">
          © 2004-{new Date().getFullYear()} ES-CARGO 545 — AUCUN DROIT RÉSERVÉ — 
          COPIE, PARTAGE & REMIXE TOUT CE QUE TU VEUX
        </p>
        <p className="footer-meta">
          Fait avec des pneus, de la terre, du soleil et React (lol) ★ 
          Optimisé pour Netscape Navigator 4.0
        </p>
        <p className="email-link">
          📧 CONTACT: <a href="mailto:info@es-cargo.qc.ca">info@es-cargo.qc.ca</a>
        </p>
        <div className="badges-90s">
          <span className="badge">[ BEST VIEWED AT 800x600 ]</span>
          <span className="badge">[ MADE ON A MAC ]</span>
          <span className="badge">[ NO JAVASCRIPT* REQUIRED ]</span>
          <span className="badge">[ POWERED BY LE SOLEIL ]</span>
        </div>
        <p className="footer-tiny">* ok maybe a little javascript</p>
      </footer>

      {/* ═══ BOTTOM MARQUEE ═══ */}
      <div className="marquee-bar bottom-marquee">
        <div className="marquee-content marquee-reverse">
          🐌 ESCARGOT POWER 🐌 SLOW LIVING 🐌 FAST BUILDING 🐌 NO LANDLORDS 🐌 NO HYDRO BILLS 🐌 JUST VIBES 🐌 ESCARGOT POWER 🐌 SLOW LIVING 🐌 FAST BUILDING 🐌 NO LANDLORDS 🐌 NO HYDRO BILLS 🐌 JUST VIBES 🐌
        </div>
      </div>
    </div>
  )
}

export default App
