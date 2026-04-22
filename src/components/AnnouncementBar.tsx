export function AnnouncementBar() {
  return (
    <div style={{ width: "100%", background: "#fff", fontFamily: "var(--font-courier, 'Courier Prime', monospace)", fontSize: "13px", color: "#171717" }}>

      {/* Top strip — desktop only */}
      <div className="announcement-top" style={{ display: "none", alignItems: "center", justifyContent: "center", height: "22px", padding: "0 40px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        Free shipping to Canada on all orders above CA$980.00
      </div>

      {/* Main bar — message centré, rien d'autre */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "36px", padding: "0 16px" }}>
        <span style={{ textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          FREE SHIPPING ON ORDERS $500+ (US)
        </span>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .announcement-top { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
