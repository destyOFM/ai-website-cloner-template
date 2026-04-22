const CHEVRON = (
  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
    <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function AnnouncementBar() {
  return (
    <>
      <div className="announcement-bar announcement-bar-preview">
        {/* LEFT: locale selector (static preview) */}
        <div className="announcement-bar__locale-form">
          <div className="announcement-bar__locale-wrap">
            <select className="announcement-bar__locale-select" defaultValue="CA" aria-label="Country">
              <option value="CA">CANADA (CAD$)</option>
              <option value="US">UNITED STATES (USD$)</option>
            </select>
            {CHEVRON}
          </div>
        </div>

        {/* CENTER: two stacked messages */}
        <div className="announcement-bar__messages">
          <p className="announcement-bar__text">FREE SHIPPING ON ORDERS $500+ (US)</p>
          <p className="announcement-bar__text">FREE WORLDWIDE SHIPPING</p>
        </div>

        {/* RIGHT: spacer */}
        <div className="announcement-bar__spacer" aria-hidden="true" />
      </div>

      <style>{`
        .announcement-bar-preview {
          background: #fff;
          color: #171717;
          font-family: 'Courier Prime', 'Courier New', Courier, monospace;
          font-size: 13px;
          min-height: 64px;
          /* grid layout from theme.css — duplicated here for Next.js preview */
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 10px 16px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (min-width: 768px) {
          .announcement-bar-preview { padding-left: 40px; padding-right: 40px; }
        }
        @media (max-width: 749px) {
          .announcement-bar-preview {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            justify-items: center;
            padding: 8px 16px;
            gap: 4px;
          }
          .announcement-bar-preview .announcement-bar__locale-form { grid-row: 1; justify-self: start; }
          .announcement-bar-preview .announcement-bar__locale-select { font-size: 10px; max-width: 130px; }
          .announcement-bar-preview .announcement-bar__messages { grid-row: 2; width: 100%; }
          .announcement-bar-preview .announcement-bar__text { font-size: 10px; white-space: normal; }
          .announcement-bar-preview .announcement-bar__spacer { display: none; }
        }
        .announcement-bar__messages { display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .announcement-bar__text { text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; line-height: 1.5; letter-spacing: 0.06em; text-transform: uppercase; }
        .announcement-bar__locale-form { justify-self: start; display: flex; align-items: center; }
        .announcement-bar__locale-wrap { position: relative; display: inline-flex; align-items: center; }
        .announcement-bar__locale-select { -webkit-appearance: none; appearance: none; background: transparent; border: none; font-family: inherit; font-size: inherit; color: inherit; cursor: pointer; padding-right: 14px; outline: none; white-space: nowrap; max-width: 180px; letter-spacing: 0.04em; text-transform: uppercase; }
        .announcement-bar__chevron { position: absolute; right: 0; top: 50%; transform: translateY(-50%); pointer-events: none; }
        .announcement-bar__spacer { justify-self: end; }
      `}</style>
    </>
  );
}
