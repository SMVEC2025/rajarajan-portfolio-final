import React, { useEffect, useRef } from "react";
import "./RdHeroV2.scss";

const DEFAULT_ROLES = [
  { label: "Treasurer", org: "SMV Group" },
  { label: "Pro Chancellor", org: "Takshashila" },
  { label: "CEO", org: "Bloombyte" },
];

const DEFAULT_NAV_LOGOS = [
  "/images/nav-logo/one.png",
  "/images/nav-logo/two.png",
  "/images/nav-logo/three.png",
  "/images/nav-logo/four.png",
  "/images/nav-logo/five.png",
  "/images/nav-logo/six.png",
  "/images/nav-logo/seven.png",
];

export default function RdHeroV2({
  monogram = "RD",
  navLogos = DEFAULT_NAV_LOGOS,
  eyebrow = "Puducherry / India",
  firstName = "Rajarajan",
  lastName = "Dhanasekaran",
  role = "Institution builder",
  statement = (
    <>
      I build <strong>institutions</strong> — and the <strong>technology</strong> that runs them.
    </>
  ),
  roles = DEFAULT_ROLES,
  ctaLabel = "Schedule a meeting",
  portrait = "/images/background/portrait-hero.webp",
  portraitAlt = "Rajarajan Dhanasekaran",
  onSchedule,
  className = "",
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const frame = requestAnimationFrame(() => node.classList.add("is-ready"));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section ref={rootRef} className={`rdv2-hero ${className}`.trim()} aria-label={`${firstName} ${lastName} - ${role}`}>
      <div className="rdv2-hero__wash" aria-hidden="true" />
      <div className="rdv2-hero__ring" aria-hidden="true" />
      <div className="rdv2-hero__dot" aria-hidden="true" />

      <div className="rdv2-hero__portrait" aria-hidden={!portrait}>
        {portrait ? <img className="rdv2-hero__portrait-img" src={portrait} alt={portraitAlt} decoding="async" /> : null}
      </div>

      <div className="rdv2-hero__inner">
        <header className="rdv2-hero__top">
          <p className="rdv2-hero__eyebrow rdv2-hero__eyebrow--nav">{eyebrow}</p>
          {/*
          {navLogos.length ? (
            <div className="rdv2-hero__logo-rotator" aria-label="Institution logos" style={{ "--rdv2-logo-duration": `${navLogos.length * 3}s` }}>
              {navLogos.map((logo, index) => (
                <img className="rdv2-hero__nav-logo" src={logo} alt="" aria-hidden="true" decoding="async" key={logo} style={{ "--rdv2-logo-delay": `${index * 3}s` }} />
              ))}
            </div>
          ) : (
            <span className="rdv2-hero__monogram">{monogram}</span>
          )}
          */}
        </header>

        <div className="rdv2-hero__copy">
          <h1 className="rdv2-hero__name">
            <span className="rdv2-hero__name-line">{firstName}</span>
            <span className="rdv2-hero__name-line">{lastName}</span>
          </h1>

          <p className="rdv2-hero__role">
            <span className="rdv2-hero__rule" aria-hidden="true" />
            <span className="rdv2-hero__role-text">{role}</span>
          </p>

          {statement ? <p className="rdv2-hero__statement">{statement}</p> : null}

          <button type="button" className="rdv2-hero__cta" onClick={onSchedule}>
            {ctaLabel}
            <span className="rdv2-hero__cta-arrow" aria-hidden="true">
              &#8599;
            </span>
          </button>
        </div>

        <footer className="rdv2-hero__footer">
          <span className="rdv2-hero__divider" aria-hidden="true" />
          <ul className="rdv2-hero__roles">
            {roles.map(item => (
              <li className="rdv2-hero__role-item" key={item.org}>
                <span className="rdv2-hero__role-label">{item.label}</span>
                <span className="rdv2-hero__role-org">{item.org}</span>
              </li>
            ))}
          </ul>
        </footer>
      </div>

      <div className="rdv2-hero__scroll" aria-hidden="true">
        <span className="rdv2-hero__scroll-label">Scroll</span>
        <span className="rdv2-hero__scroll-track">
          <span className="rdv2-hero__scroll-bar" />
        </span>
      </div>
    </section>
  );
}
