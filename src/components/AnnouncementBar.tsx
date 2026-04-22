export function AnnouncementBar() {
  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        fontFamily: "var(--font-courier, 'Courier Prime', monospace)",
        fontSize: "13px",
        color: "#171717",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "48px",
        padding: "0 16px",
      }}
      className="announcement-bar-responsive"
    >
      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        FREE SHIPPING ON ORDERS $500+ (US)
      </span>
      <style>{`
        @media (min-width: 768px) {
          .announcement-bar-responsive { height: 42px !important; padding: 0 40px !important; }
        }
      `}</style>
    </div>
  );
}
