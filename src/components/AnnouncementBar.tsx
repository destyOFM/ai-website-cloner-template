export function AnnouncementBar() {
  return (
    <div style={{ width: "100%", background: "#fff", fontFamily: "var(--font-courier, 'Courier Prime', monospace)", fontSize: "13px", color: "#171717" }}>

      {/* Top strip — desktop only */}
      <div style={{
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        height: "22px",
        padding: "0 40px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }} className="announcement-top">
        Free shipping to Canada on all orders above CA$980.00
      </div>

      {/* Main bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "36px",
        padding: "0 16px",
      }} className="announcement-main">

        {/* Left: currency — hidden on mobile, visible on desktop */}
        <span style={{ whiteSpace: "nowrap", flexShrink: 0 }} className="announcement-currency">
          CANADA (CAD$)&nbsp;▾
        </span>

        {/* Center: message — always visible, always centered */}
        <span style={{ textAlign: "center", flex: 1, padding: "0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          FREE SHIPPING ON ORDERS $500+ (US)
        </span>

        {/* Right: mirror spacer to keep text truly centred on desktop */}
        <span style={{ whiteSpace: "nowrap", flexShrink: 0, visibility: "hidden" }} className="announcement-currency" aria-hidden="true">
          CANADA (CAD$)&nbsp;▾
        </span>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .announcement-top { display: flex !important; }
          .announcement-main { height: 30px !important; padding: 0 40px !important; }
        }
        @media (max-width: 767px) {
          .announcement-currency { display: none !important; }
        }
      `}</style>
    </div>
  );
}
