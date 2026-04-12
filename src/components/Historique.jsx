import './Historique.css'


export default function History() {
  return (
    <section id="history" className="historique-wrapper">

      {/* ── Section header ─────────────────────────────── */}
      <div className="hist-header bg-forest">
        <div className="hist-header__inner">
          <span className="tag" style={{ color: 'var(--mustard)', borderColor: 'var(--mustard)' }}>
            History
          </span>
          <h2 className="hist-header__title">
            From an idea<br />to a movement.
          </h2>
          <p className="hist-header__lead">
            L'Es-Cargo carries the legacy of a radical architecture
            born from the desire to reconcile humanity with the planet.
          </p>
        </div>
      </div>

      {/* ── What is an Earthship ───────────────────────── */}
      <div className="earthship-explainer">
        <div className="earthship-explainer__text">
          <span className="tag" style={{ color: 'var(--forest-green)', borderColor: 'var(--forest-green)' }}>
            What is an earthship?
          </span>
          <h3>A vessel made of earth.</h3>
          <p>
            An earthship is <strong>radical bioclimatic architecture</strong>: built
            primarily with reclaimed materials (tires, bottles, cans), it generates
            its own energy, harvests rainwater, treats its own waste on-site, and
            grows food — all without connecting to public utilities.
          </p>
          <p>
            The concept rests on six foundations: <em>off-grid energy,
            autonomous water, on-site sewage treatment, integrated food production,
            reused materials, and passive thermal comfort</em>. Every wall is as much
            a political act as an architectural one.
          </p>
          <p>
            To build an earthship is to refuse the idea that comfort must cost the earth.
          </p>
        </div>
        <div className="earthship-explainer__principles">
          {[
            ['Solar & Wind Energy', 'Photovoltaic panels, battery storage, total grid independence.'],
            ['Rainwater Harvesting', 'Filtered rainwater for household use, runoff managed by the land.'],
            ['Integrated Gardens', 'Interior greenhouses fed by greywater, year-round food production.'],
            ['Reclaimed Materials', 'Used tires, bottles, cans — waste transformed into structure.'],
            ['Passive Thermal Comfort', 'Wall thermal mass and solar orientation maintain temperature without external heating.'],
          ].map(([title, desc], i) => (
            <div className="principle-card" key={title}>
              <span className="principle-card__num mono">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}
