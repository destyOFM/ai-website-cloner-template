export function AnnouncementBar() {
  return (
    <div className="announcement-bar-root">
      {/* Top strip — desktop only */}
      <div className="announcement-bar-top">
        <span>Free shipping to Canada on all orders above CA$980.00</span>
      </div>

      {/* Main bar — visible on all screen sizes */}
      <div className="announcement-bar-main">
        <button type="button" className="announcement-bar-currency" aria-label="Select currency">
          CANADA (CAD$)&nbsp;▾
        </button>

        {/* Scrolling marquee on mobile, static centered text on desktop */}
        <div className="announcement-bar-message-wrap" aria-live="polite">
          <span className="announcement-bar-message">FREE SHIPPING ON ORDERS $500+ (US)</span>
        </div>

        {/* Spacer keeps currency left-aligned and message truly centered */}
        <div className="announcement-bar-spacer" aria-hidden="true">CANADA (CAD$)&nbsp;▾</div>
      </div>

      <style>{`
        .announcement-bar-root {
          width: 100%;
          background: #fff;
          font-family: var(--font-courier, "Courier Prime", monospace);
          font-size: 13px;
          color: #171717;
        }

        /* ── Top strip (desktop only) ── */
        .announcement-bar-top {
          display: none;
          align-items: center;
          justify-content: center;
          height: 22px;
          padding: 0 40px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        @media (min-width: 768px) {
          .announcement-bar-top { display: flex; }
        }

        /* ── Main bar ── */
        .announcement-bar-main {
          position: relative;
          display: flex;
          align-items: center;
          height: 36px;
          padding: 0 16px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .announcement-bar-main { height: 30px; padding: 0 40px; }
        }

        /* Currency button */
        .announcement-bar-currency {
          position: relative;
          z-index: 2;
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          color: #171717;
          cursor: pointer;
          white-space: nowrap;
          /* 44px touch target */
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        @media (min-width: 768px) {
          .announcement-bar-currency { min-height: unset; }
        }

        /* Message wrapper — fills remaining space, centred */
        .announcement-bar-message-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          overflow: hidden;
        }

        /* On mobile: marquee scroll if needed */
        .announcement-bar-message {
          white-space: nowrap;
          display: block;
        }
        @media (max-width: 767px) {
          .announcement-bar-message {
            animation: announcement-scroll 18s linear infinite;
            padding-left: 100%;
          }
          /* Pause when user prefers reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .announcement-bar-message {
              animation: none;
              padding-left: 0;
              white-space: normal;
              text-align: center;
            }
          }
        }

        @keyframes announcement-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        /* Mirror spacer keeps text truly centered on desktop */
        .announcement-bar-spacer {
          visibility: hidden;
          white-space: nowrap;
          pointer-events: none;
          margin-left: auto;
        }
      `}</style>
    </div>
  );
}
