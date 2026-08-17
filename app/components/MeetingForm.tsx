"use client";

import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gsap } from "@/app/lib/gsap";

const MF_NAVY = "#1C3163";
const MF_NAVY_SOFT = "#41485C";
const MF_GOLD = "#B08F55";
const MF_LINE = "#E4E1D9";
const MF_SHELL = "#FBFAF7";
const MF_FIELD = "transparent";
const MF_FONT = '"Google Sans", "Outfit", system-ui, -apple-system, sans-serif';

const PURPOSE_OPTIONS = [
  { value: "Business Discussion", label: "Business Discussion" },
  { value: "Academic / Institutional Collaboration", label: "Academic Collaboration" },
  { value: "Technical Consultation", label: "Technical Consultation" },
  { value: "Product / Service Enquiry", label: "Product / Service Enquiry" },
  { value: "Other", label: "Other" },
];

const MODE_OPTIONS = [
  {
    value: "Online",
    label: "Online Meeting",
    sub: "Google Meet / Zoom / MS Teams",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    value: "Offline",
    label: "In-person Meeting",
    sub: "At our campus / your location",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

function inputStyle(err: boolean, focused: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "15px 18px",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    color: MF_NAVY,
    background: MF_FIELD,
    border: `1px solid ${err ? "#c0392b" : focused ? MF_GOLD : MF_LINE}`,
    borderRadius: "4px",
    outline: "none",
    boxSizing: "border-box",
    transition: "background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
    boxShadow: focused ? "0 0 0 3px rgba(176,143,85,0.12)" : "none",
    lineHeight: "1.5",
  };
}

interface FieldInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: boolean;
  helperText?: string;
  focusedId: string | null;
  onFocus: (id: string) => void;
  onBlur: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function FieldInput({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  error,
  helperText,
  focusedId,
  onFocus,
  onBlur,
  onChange,
}: FieldInputProps) {
  const isFocused = focusedId === id;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label htmlFor={id} style={{ fontSize: "0.66rem", letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 500, color: error ? "#c0392b" : isFocused ? MF_GOLD : MF_NAVY_SOFT, transition: "color 0.18s ease", fontFamily: "inherit" }}>
        {label}
      </label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} onFocus={() => onFocus(id)} onBlur={onBlur} style={inputStyle(!!error, isFocused)} autoComplete="off" />
      {helperText && <span style={{ fontSize: "0.65rem", color: "#c0392b", paddingLeft: "2px", fontFamily: "inherit" }}>{helperText}</span>}
    </div>
  );
}

/* Half-hour slots from 08:00 to 19:30, as "HH:MM" 24h values paired with the
   12h label shown in the list. */
const TIME_SLOTS = (() => {
  const slots: { value: string; label: string }[] = [];
  for (let h = 8; h <= 19; h++) {
    for (const m of ["00", "30"]) {
      const period = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      slots.push({
        value: `${String(h).padStart(2, "0")}:${m}`,
        label: `${h12}:${m} ${period}`,
      });
    }
  }
  return slots;
})();

interface DateTimePickerProps {
  date: Date | null;
  time: string;
  error?: boolean;
  onChange: (date: Date | null, time: string) => void;
}

/* Single field holding both date and time. Opening it reveals one popup:
   the calendar on the left, the slot list on the right, and a footer showing
   the running selection with Cancel / Schedule. Values are only committed to
   the form when Schedule is pressed, so Cancel can restore the previous pair. */
function DateTimePicker({ date, time, error, onChange }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [draftDate, setDraftDate] = useState<Date | null>(date);
  const [draftTime, setDraftTime] = useState(time);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Seed the draft at open time rather than in an effect, so an abandoned edit
  // never leaks into the next session and no extra render is queued.
  const openPicker = () => {
    setDraftDate(date);
    setDraftTime(time);
    setOpen(true);
  };

  // Bring the chosen slot into view — a late-afternoon pick otherwise sits
  // below the fold and the list looks untouched.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>("[data-active]");
    if (active) active.scrollIntoView({ block: "center" });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const fmtDate = (d: Date | null) =>
    d ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
  const fmtTime = (t: string) => TIME_SLOTS.find(s => s.value === t)?.label ?? "";

  const summary = date && time
    ? `${fmtDate(date)} · ${fmtTime(time)}`
    : date
      ? fmtDate(date)
      : "";

  const draftSummary = draftDate && draftTime
    ? `${fmtDate(draftDate)} · ${fmtTime(draftTime)}`
    : draftDate
      ? fmtDate(draftDate)
      : "No date selected";

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPicker())}
        style={{
          ...inputStyle(!!error, open),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          textAlign: "left",
          height: "52px",
          color: summary ? MF_NAVY : "#bbb",
        }}
      >
        <span style={{ fontSize: "0.85rem" }}>{summary || "Select date & time"}</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45, flexShrink: 0 }}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>

      {open && (
        <div className="rj-dtp-pop">
          <div className="rj-dtp-cols">
            {/* Calendar — inline, styling inherited from the .rj-dp rules */}
            <div className={`rj-dp rj-dtp-cal${error ? " dp-error" : ""}`}>
              <DatePicker
                selected={draftDate}
                onChange={(d: Date | null) => setDraftDate(d)}
                minDate={new Date()}
                inline
              />
            </div>

            {/* Time slots */}
            <div className="rj-dtp-times" ref={listRef}>
              {TIME_SLOTS.map(slot => {
                const active = draftTime === slot.value;
                return (
                  <button
                    key={slot.value}
                    type="button"
                    data-active={active || undefined}
                    className={`rj-dtp-slot${active ? " is-active" : ""}`}
                    onClick={() => setDraftTime(slot.value)}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer: cancel / running selection / confirm */}
          <div className="rj-dtp-foot">
            <button type="button" className="rj-dtp-cancel" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <span className="rj-dtp-summary">{draftSummary}</span>
            <button
              type="button"
              className="rj-dtp-confirm"
              disabled={!draftDate || !draftTime}
              onClick={() => {
                onChange(draftDate, draftTime);
                setOpen(false);
              }}
            >
              Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "1.6rem 0 0.4rem" }}>
      <span style={{ fontSize: "0.7rem", letterSpacing: "0.06em", fontWeight: 500, color: MF_GOLD, fontFamily: "inherit" }}>{num}</span>
      <span style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500, color: MF_NAVY, fontFamily: "inherit", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: MF_LINE }} />
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MeetingForm({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    org: "",
    designation: "",
    purpose: "",
    mode: "",
    date: null as Date | null,
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    const aside = panel.querySelector<HTMLElement>(".mf-aside");
    const main = panel.querySelector<HTMLElement>(".mf-main");

    gsap.killTweensOf([overlay, panel, aside, main]);

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "block", opacity: 0 });
      gsap.set(panel, { x: 0, y: 0 });
      if (aside) gsap.set(aside, { opacity: 0, x: 0, y: 0 });
      if (main) gsap.set(main, { opacity: 1, xPercent: 100, x: 0, y: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(overlay, { opacity: 1, duration: 0.24, ease: "power2.out" })
        .to(aside, { opacity: 1, duration: 0.22, ease: "power2.out" }, 0.02)
        .to(main, { xPercent: 0, duration: 1.05, ease: "power4.out" }, 0.08);
    } else {
      if (main) gsap.to(main, { opacity: 0, duration: 0.22, ease: "power2.in" });
      if (aside) gsap.to(aside, { opacity: 0, duration: 0.2, ease: "power2.in" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.28,
        delay: 0.04,
        ease: "power2.in",
        onComplete: () => {
          gsap.set([panel, aside, main], { clearProps: "transform,opacity" });
          gsap.set(overlay, { display: "none" });
          document.body.style.overflow = "";
          setSubmitted(false);
          setSubmitError(null);
          setErrors({});
          setForm({ name: "", email: "", mobile: "", org: "", designation: "", purpose: "", mode: "", date: null, time: "", message: "" });
        },
      });
    }
  }, [open]);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
    else if (form.mobile.length !== 10) e.mobile = "Enter a valid 10-digit number.";
    if (!form.designation.trim()) e.designation = "Designation is required.";
    if (!form.org.trim()) e.org = "Organisation is required.";
    if (!form.purpose) e.purpose = "Please select a purpose.";
    if (!form.mode) e.mode = "Please select a meeting mode.";
    if (!form.date) e.date = "Please select a preferred date.";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          org: form.org,
          designation: form.designation,
          purpose: form.purpose,
          mode: form.mode,
          date: form.date ? form.date.toDateString() : "",
          time: form.time,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const sf = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(ev => {
      const n = { ...ev };
      delete n[k];
      return n;
    });
  };

  const clearErr = (k: string) => setErrors(ev => {
    const n = { ...ev };
    delete n[k];
    return n;
  });

  return (
    <>
      <style>{`
        /* --- Calendar popup: light card, month label left, chevrons right --- */
        .rj-dp .react-datepicker { font-family: inherit; border: 1px solid #EAE7E1; border-radius: 16px; box-shadow: 0 18px 50px rgba(28,49,99,0.16); overflow: hidden; background: #fff; padding: 6px 6px 0; }
        .rj-dp .react-datepicker__header { background: #fff; border-bottom: none; padding: 14px 12px 6px; }
        .rj-dp .react-datepicker__current-month {
          color: ${MF_NAVY}; font-size: 0.74rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; text-align: left; padding-left: 6px;
        }
        /* Chevrons sit together at the top-right, clear of the month label. */
        /* Nav buttons. The library ships text-indent:-999em + overflow:hidden
           to hide the button label, so the chevron must stay absolutely
           positioned — taking it out of flow makes text-indent drag it away
           and overflow clip it. Keep abs positioning, zero out the offsets,
           and centre the ::before on the button box directly. */
        .rj-dp .react-datepicker__navigation {
          top: 14px; width: 26px; height: 26px; border-radius: 50%;
          padding: 0; transition: background 0.15s;
        }
        .rj-dp .react-datepicker__navigation:hover { background: #F2F0EC; }
        .rj-dp .react-datepicker__navigation--previous { left: auto; right: 44px; }
        .rj-dp .react-datepicker__navigation--next { right: 12px; }
        .rj-dp .react-datepicker__navigation-icon { position: static; top: 0; left: 0; right: 0; width: 0; font-size: 0; }
        /* 6px box, 1.5px borders → true centre is 50% minus half the box (3px),
           then minus ~1px to compensate for the rotated square's visual mass. */
        .rj-dp .react-datepicker__navigation-icon::before {
          border-color: #8A8A8A; border-width: 1.5px 1.5px 0 0;
          width: 6px; height: 6px; position: absolute; margin: 0;
          top: 50%; left: 50%; right: auto;
        }
        .rj-dp .react-datepicker__navigation--previous .react-datepicker__navigation-icon::before { transform: translate(-40%, -50%) rotate(-135deg); }
        .rj-dp .react-datepicker__navigation--next .react-datepicker__navigation-icon::before { transform: translate(-60%, -50%) rotate(45deg); }
        .rj-dp .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before { border-color: ${MF_NAVY}; }

        /* Weekday initials — muted, wide-tracked */
        .rj-dp .react-datepicker__day-names { margin-top: 8px; padding: 0 4px; }
        .rj-dp .react-datepicker__day-name { color: #A8A6A1; font-size: 0.64rem; font-weight: 500; letter-spacing: 0.04em; width: 2rem; line-height: 1.8rem; margin: 0.14rem; }

        /* Month label repeated above the grid, in gold */
        .rj-dp .react-datepicker__month { margin: 4px 4px 8px; }
        .rj-dp .react-datepicker__month-container { padding-bottom: 4px; }

        /* Day cells: circular, generous hit area */
        .rj-dp .react-datepicker__day { font-size: 0.76rem; color: #3A3A3A; width: 2rem; height: 2rem; line-height: 2rem; margin: 0.14rem; border-radius: 50%; transition: background 0.15s, color 0.15s; }
        .rj-dp .react-datepicker__day:hover { background: #F2F0EC; color: #111; border-radius: 50%; }
        .rj-dp .react-datepicker__day--selected { background: ${MF_GOLD} !important; color: #fff !important; border-radius: 50% !important; font-weight: 600; }
        .rj-dp .react-datepicker__day--selected:hover { background: ${MF_GOLD} !important; }
        .rj-dp .react-datepicker__day--keyboard-selected { background: transparent; color: ${MF_NAVY}; border-radius: 50%; }
        .rj-dp .react-datepicker__day--today { font-weight: 600; color: ${MF_NAVY}; }
        .rj-dp .react-datepicker__day--outside-month { color: #D6D4CF; }
        .rj-dp .react-datepicker__day--disabled { color: #D6D4CF !important; }
        .rj-dp .react-datepicker__day--disabled:hover { background: transparent !important; }
        .rj-dp .react-datepicker__triangle { display: none; }
        .rj-dp .react-datepicker__input-container input { width: 100%; padding: 15px 18px; height: 52px; font-family: inherit; font-size: 0.9rem; color: ${MF_NAVY}; background: ${MF_FIELD}; border: 1px solid ${MF_LINE}; border-radius: 4px; outline: none; cursor: pointer; box-sizing: border-box; transition: all 0.18s ease; line-height: 1.5; }
        .rj-dp .react-datepicker__input-container input:focus { border-color: ${MF_GOLD}; box-shadow: 0 0 0 3px rgba(176,143,85,0.12); }
        .rj-dp.dp-error .react-datepicker__input-container input { border-color: #c0392b; }
        .rj-dp .react-datepicker-popper { z-index: 10000; }
        .rj-dp .react-datepicker-wrapper, .rj-dp .react-datepicker__input-container { display: block; width: 100%; }
        .rj-dp .react-datepicker__input-container input::placeholder { color: #bbb; font-size: 0.82rem; }
        /* --- Combined date + time popup ------------------------------------ */
        .rj-dtp-pop {
          position: absolute; bottom: calc(100% + 8px); left: 0; z-index: 10000;
          background: #fff; border: 1px solid #EAE7E1; border-radius: 16px;
          box-shadow: 0 18px 50px rgba(28,49,99,0.16); overflow: hidden;
        }
        .rj-dtp-cols { display: flex; align-items: stretch; }
        /* Calendar keeps its own look; strip the card chrome it carries when
           standalone so it sits flush inside this shared popup. */
        .rj-dtp-cal .react-datepicker { border: none; box-shadow: none; border-radius: 0; }
        .rj-dtp-times {
          width: 132px; flex-shrink: 0; overflow-y: auto; max-height: 300px;
          border-left: 1px solid #EFEDE8; padding: 8px 6px;
        }
        .rj-dtp-slot {
          display: block; width: 100%; padding: 8px 12px; margin-bottom: 2px;
          border: none; border-radius: 8px; background: transparent;
          color: ${MF_NAVY}; font-family: inherit; font-size: 0.78rem;
          text-align: left; cursor: pointer; white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }
        .rj-dtp-slot:hover { background: #F2F0EC; }
        .rj-dtp-slot.is-active { background: ${MF_GOLD}; color: #fff; font-weight: 600; }
        .rj-dtp-slot.is-active:hover { background: ${MF_GOLD}; }
        .rj-dtp-foot {
          display: flex; align-items: center; gap: 10px;
          padding: 12px; border-top: 1px solid #EFEDE8; background: #fff;
        }
        .rj-dtp-summary {
          flex: 1; text-align: center; font-size: 0.75rem; color: ${MF_NAVY};
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .rj-dtp-cancel, .rj-dtp-confirm {
          border-radius: 999px; font-family: inherit; font-size: 0.76rem;
          font-weight: 600; padding: 9px 18px; cursor: pointer; flex-shrink: 0;
          transition: background 0.18s, border-color 0.18s, opacity 0.18s;
        }
        .rj-dtp-cancel { background: #fff; border: 1px solid ${MF_LINE}; color: ${MF_NAVY}; }
        .rj-dtp-cancel:hover { border-color: #C8C4BC; background: #FAF9F6; }
        .rj-dtp-confirm { background: ${MF_NAVY}; border: 1px solid ${MF_NAVY}; color: #fff; }
        .rj-dtp-confirm:hover { background: #16274F; }
        .rj-dtp-confirm:disabled { opacity: 0.4; cursor: not-allowed; }
        @media (max-width: 560px) {
          .rj-dtp-cols { flex-direction: column; }
          .rj-dtp-times { width: auto; max-height: 150px; border-left: none; border-top: 1px solid #EFEDE8; }
        }

        .mf-split { display: grid; grid-template-columns: 37% 1fr; }
        .mf-aside { position: relative; overflow: hidden; background: #C9C7C4; }
        .mf-aside__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; filter: grayscale(0.28) contrast(1.02); }
        .mf-aside__scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(30,34,44,0.30) 0%, rgba(30,34,44,0.06) 38%, rgba(22,26,36,0.72) 100%), linear-gradient(90deg, rgba(28,49,99,0.16) 0%, rgba(28,49,99,0) 45%); }
        .mf-aside__caption { position: absolute; left: 46px; right: 32px; bottom: 76px; color: #fff; }
        .mf-aside__eyebrow { margin: 0 0 14px; font-size: 0.62rem; font-weight: 500; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,255,255,0.78); }
        .mf-aside__name { display: flex; flex-direction: column; margin: 0; font-size: clamp(1.6rem, 2.5vw, 2.3rem); font-weight: 400; line-height: 1.12; letter-spacing: -0.035em; color: #fff; }
        .mf-aside__rule { display: block; width: 62px; height: 1px; margin-top: 22px; background: rgba(255,255,255,0.5); }
        .mf-main { display: flex; flex-direction: column; min-width: 0; height: 100dvh; overflow: hidden; background: ${MF_SHELL}; }
        .mf-topbar { flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; padding: 30px 48px 6px; }
        .mf-back { display: inline-flex; align-items: center; gap: 10px; padding: 0; background: none; border: 0; cursor: pointer; font-family: inherit; font-size: 0.66rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: ${MF_NAVY_SOFT}; transition: color 0.22s ease; }
        .mf-back:hover { color: ${MF_GOLD}; }
        .mf-back::after { content: "\\2192"; font-size: 0.8rem; line-height: 1; }
        .mf-body { padding: 18px 48px 34px; }
        .mf-title { margin: 0; font-family: "Google Sans", sans-serif; font-optical-sizing: auto; font-size: clamp(1.9rem, 2.9vw, 2.7rem); font-weight: 400; font-variation-settings: "GRAD" 0; letter-spacing: -0.035em; line-height: 1.06; color: ${MF_NAVY}; }
        .mf-title__rule { display: block; width: 58px; height: 2px; margin: 14px 0 0; background: ${MF_GOLD}; }
        .mf-sub { margin: 14px 0 24px; font-size: 0.9rem; line-height: 1.6; color: ${MF_NAVY_SOFT}; }
        .mf-footer { flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; gap: 24px; padding: 18px 48px 22px; background: ${MF_SHELL}; border-top: 1px solid ${MF_LINE}; }
        .mf-submit { display: inline-flex; align-items: center; justify-content: center; gap: 16px; min-width: 216px; padding: 13px 26px; border: 0; border-radius: 3px; background: ${MF_GOLD}; color: #fff; cursor: pointer; font-family: inherit; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; transition: background 0.22s ease, transform 0.18s ease; }
        .mf-submit:hover:not(:disabled) { background: #9C7C43; transform: translateY(-1px); }
        .mf-submit:disabled { opacity: 0.65; cursor: default; }
        .mf-submit__icon { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; }
        @media (max-width: 900px) {
          .mf-split { grid-template-columns: 1fr; }
          .mf-aside { display: none; }
          .mf-topbar { padding: 22px 24px 4px; }
          .mf-body { padding: 20px 24px 32px; }
          .mf-footer { padding: 14px 24px 18px; }
          .mf-submit { width: 100%; }
        }
        .mf-scroll::-webkit-scrollbar { width: 3px; }
        .mf-scroll::-webkit-scrollbar-track { background: transparent; }
        .mf-scroll::-webkit-scrollbar-thumb { background: #C8C4BC; border-radius: 99px; }
        .mf-textarea { resize: none; line-height: 1.65 !important; font-family: inherit; }
        .mf-textarea::placeholder { color: #bbb; }
        .purpose-chip:hover:not(.is-selected), .mode-card:hover:not(.is-selected) { border-color: ${MF_GOLD} !important; }
      `}</style>

      <div ref={overlayRef} style={{ display: "none", position: "fixed", inset: 0, zIndex: 1000, background: "transparent", fontFamily: MF_FONT }}>
        <div ref={panelRef} className="mf-split" style={{ width: "100%", height: "100dvh", background: "transparent" }}>
          <aside className="mf-aside" aria-hidden="true">
            <img className="mf-aside__img" src="/images/background/portrait-hero.webp" alt="" decoding="async" />
            <div className="mf-aside__scrim" />
            <div className="mf-aside__caption">
              <p className="mf-aside__eyebrow">Puducherry / India</p>
              <p className="mf-aside__name"><span>Rajarajan</span><span>Dhanasekaran</span></p>
              <span className="mf-aside__rule" />
            </div>
          </aside>

          <div className="mf-main">
            <div className="mf-topbar">
              <button onClick={onClose} className="mf-back" type="button">
                {submitted ? "Close" : "Back"}
              </button>
            </div>

            <div className="mf-scroll" data-lenis-prevent style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
              {submitted && (
                <div style={{ padding: "2rem", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: MF_GOLD, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.8rem" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 style={{ fontFamily: "inherit", fontSize: "1.9rem", fontWeight: 400, color: MF_NAVY, letterSpacing: "-0.03em", marginBottom: "0.9rem" }}>Enquiry received</h3>
                  <p style={{ fontFamily: "inherit", fontSize: "0.9rem", color: MF_NAVY_SOFT, lineHeight: 1.75, maxWidth: "340px", margin: "0 auto 2rem" }}>Thank you for reaching out. Our team will review your request and confirm the meeting details shortly.</p>
                  <button onClick={onClose} style={{ background: MF_GOLD, color: "#fff", border: "none", borderRadius: "3px", padding: "1rem 2.6rem", fontFamily: "inherit", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500 }}>Done</button>
                </div>
              )}

              {!submitted && (
                <div className="mf-body">
                  <h2 className="mf-title">Schedule a meeting</h2>
                  <span className="mf-title__rule" aria-hidden="true" />
                  <p className="mf-sub">Share a few details and the office will confirm a slot with you.</p>

                  <form id="mf-form" onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    <SectionLabel num="01" label="Personal Details" />
                    <FieldInput id="name" label="Full Name" placeholder="Enter your full name" value={form.name} onChange={sf("name")} error={!!errors.name} helperText={errors.name} focusedId={focusedId} onFocus={setFocusedId} onBlur={() => setFocusedId(null)} />
                    <FieldInput id="email" label="Email Address" type="email" placeholder="your@email.com" value={form.email} onChange={sf("email")} error={!!errors.email} helperText={errors.email} focusedId={focusedId} onFocus={setFocusedId} onBlur={() => setFocusedId(null)} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                      <FieldInput id="mobile" label="Mobile" type="tel" placeholder="10-digit number" value={form.mobile} onChange={e => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setForm(f => ({ ...f, mobile: val }));
                        clearErr("mobile");
                      }} error={!!errors.mobile} helperText={errors.mobile} focusedId={focusedId} onFocus={setFocusedId} onBlur={() => setFocusedId(null)} />
                      <FieldInput id="designation" label="Designation" placeholder="Role / position" value={form.designation} onChange={sf("designation")} error={!!errors.designation} helperText={errors.designation} focusedId={focusedId} onFocus={setFocusedId} onBlur={() => setFocusedId(null)} />
                    </div>
                    <FieldInput id="org" label="Organisation / Institution" placeholder="Company or college name" value={form.org} onChange={sf("org")} error={!!errors.org} helperText={errors.org} focusedId={focusedId} onFocus={setFocusedId} onBlur={() => setFocusedId(null)} />

                    <SectionLabel num="02" label="Meeting Details" />
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <label style={{ fontSize: "0.66rem", letterSpacing: "0.13em", textTransform: "uppercase", color: errors.purpose ? "#c0392b" : MF_NAVY_SOFT, fontWeight: 500, fontFamily: "inherit" }}>Purpose</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {PURPOSE_OPTIONS.map(o => {
                          const sel = form.purpose === o.value;
                          return (
                            <button key={o.value} type="button" className={`purpose-chip${sel ? " is-selected" : ""}`} onClick={() => { setForm(f => ({ ...f, purpose: o.value })); clearErr("purpose"); }} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 17px", borderRadius: "4px", border: `1px solid ${sel ? MF_GOLD : MF_LINE}`, background: sel ? "#FAF5EC" : MF_FIELD, color: MF_NAVY, fontFamily: "inherit", fontSize: "0.82rem", cursor: "pointer", fontWeight: 500, transition: "border-color 0.22s ease, background 0.22s ease", whiteSpace: "nowrap" }}>
                              <span style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", border: `1.5px solid ${sel ? MF_GOLD : "#C8C4BC"}`, background: sel ? MF_GOLD : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" style={{ opacity: sel ? 1 : 0 }}><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              </span>
                              {o.label}
                            </button>
                          );
                        })}
                      </div>
                      {errors.purpose && <span style={{ fontSize: "0.6rem", color: "#c0392b", fontFamily: "inherit" }}>{errors.purpose}</span>}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <label style={{ fontSize: "0.66rem", letterSpacing: "0.13em", textTransform: "uppercase", color: errors.mode ? "#c0392b" : MF_NAVY_SOFT, fontWeight: 500, fontFamily: "inherit" }}>Preferred Meeting Mode</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        {MODE_OPTIONS.map(o => {
                          const sel = form.mode === o.value;
                          return (
                            <button key={o.value} type="button" className={`mode-card${sel ? " is-selected" : ""}`} onClick={() => { setForm(f => ({ ...f, mode: o.value })); clearErr("mode"); }} style={{ position: "relative", textAlign: "left", padding: "18px 17px", borderRadius: "4px", border: `1px solid ${sel ? MF_GOLD : MF_LINE}`, background: sel ? "#FAF5EC" : MF_FIELD, color: MF_NAVY, fontFamily: "inherit", cursor: "pointer", transition: "border-color 0.2s ease, background 0.2s ease" }}>
                              {sel && <span style={{ position: "absolute", top: "12px", right: "12px", width: "22px", height: "22px", borderRadius: "50%", background: MF_GOLD, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
                              <span style={{ display: "block", color: sel ? MF_GOLD : "var(--muted)", marginBottom: "10px" }}>{o.icon}</span>
                              <span style={{ display: "block", fontSize: "0.82rem", fontWeight: sel ? 700 : 400, marginBottom: "3px" }}>{o.label}</span>
                              <span style={{ display: "block", fontSize: "0.67rem", color: "var(--muted)", lineHeight: 1.5 }}>{o.sub}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.mode && <span style={{ fontSize: "0.6rem", color: "#c0392b", fontFamily: "inherit" }}>{errors.mode}</span>}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      <label style={{ fontSize: "0.66rem", letterSpacing: "0.13em", textTransform: "uppercase", color: errors.date || errors.time ? "#c0392b" : MF_NAVY_SOFT, fontWeight: 500, fontFamily: "inherit" }}>Preferred Date &amp; Time</label>
                      <DateTimePicker
                        date={form.date}
                        time={form.time}
                        error={!!(errors.date || errors.time)}
                        onChange={(d, t) => {
                          setForm(f => ({ ...f, date: d, time: t }));
                          if (d) clearErr("date");
                          if (t) clearErr("time");
                        }}
                      />
                      {(errors.date || errors.time) && <span style={{ fontSize: "0.6rem", color: "#c0392b", fontFamily: "inherit" }}>{errors.date || errors.time}</span>}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      <label style={{ fontSize: "0.66rem", letterSpacing: "0.13em", textTransform: "uppercase", color: focusedId === "message" ? MF_GOLD : MF_NAVY_SOFT, fontWeight: 500, fontFamily: "inherit", transition: "color 0.18s" }}>Message <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#999" }}>- optional</span></label>
                      <textarea className="mf-textarea" placeholder="Briefly describe your agenda or requirement..." value={form.message} onChange={sf("message")} rows={3} onFocus={() => setFocusedId("message")} onBlur={() => setFocusedId(null)} style={{ ...inputStyle(false, focusedId === "message"), padding: "11px 16px", resize: "none", lineHeight: 1.65 }} />
                    </div>

                    {submitError && <p style={{ fontSize: "0.72rem", color: "#c0392b", fontFamily: "inherit", margin: 0 }}>{submitError}</p>}
                  </form>
                </div>
              )}
            </div>

            {!submitted && (
              <div className="mf-footer">
                <button type="submit" form="mf-form" className="mf-submit" disabled={submitting}>
                  {submitting ? "Sending..." : "Submit Enquiry"}
                  <span className="mf-submit__icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 9 9" fill="none"><path d="M1 4.5H8M8 4.5L5.3 1.8M8 4.5L5.3 7.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
