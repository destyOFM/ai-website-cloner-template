export function AnnouncementBar() {
  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        fontFamily: "var(--font-courier, 'Courier Prime', monospace)",
        fontSize: "13px",
        color: "#171717",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        minHeight: "48px",
        padding: "0 16px",
      }}
      className="announcement-bar-responsive"
    >
      {/* LEFT: locale selector (static preview — Shopify handles real data) */}
      <div style={{ justifySelf: "start", display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ whiteSpace: "nowrap" }} className="announcement-bar-locale">
          CANADA (CAD$)
        </span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* CENTER: message */}
      <span style={{ textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        FREE SHIPPING ON ORDERS $500+ (US)
      </span>

      {/* RIGHT: spacer */}
      <div aria-hidden="true" />

      <style>{`
        @media (min-width: 768px) {
          .announcement-bar-responsive { padding: 0 40px !important; }
        }
        @media (max-width: 749px) {
          .announcement-bar-locale { font-size: 10px; max-width: 110px; overflow: hidden; text-overflow: ellipsis; }
        }
      `}</style>
    </div>
  );
}
