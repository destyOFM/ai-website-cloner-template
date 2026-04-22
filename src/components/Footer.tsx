import Link from "next/link";
import { cn } from "@/lib/utils";

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-fjalla)",
  fontSize: "16px",
  textTransform: "uppercase",
  color: "#171717",
  marginBottom: "16px",
};

const linkStyle: React.CSSProperties = {
  fontSize: "14px",
  fontFamily: "var(--font-courier)",
  color: "#171717",
  textDecoration: "none",
  lineHeight: "2",
  display: "block",
};

export function Footer() {
  return (
    <footer style={{ background: "#ffffff", color: "#171717" }}>
      {/* Top 3-column row */}
      <div
        className={cn("flex flex-col md:flex-row")}
        style={{
          borderTop: "1px solid #171717",
          padding: "40px",
          gap: "32px",
        }}
      >
        {/* COMPANY */}
        <div className="flex-1">
          <p style={headingStyle}>Company</p>
          <Link href="/pages/careers-2" style={linkStyle}>
            Careers
          </Link>
          <Link href="/pages/stores" style={linkStyle}>
            Stores
          </Link>
          <a
            href="https://www.stopbeingracist.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            STOP BEING RACIST
          </a>
        </div>

        {/* CUSTOMER */}
        <div className="flex-1">
          <p style={headingStyle}>Customer</p>
          <Link href="/pages/contact-us" style={linkStyle}>
            Contact Us
          </Link>
          <Link href="/pages/faq" style={linkStyle}>
            Shipping, Returns &amp; More
          </Link>
          <Link href="/pages/gift-card-balance" style={linkStyle}>
            Check Gift Card Balance
          </Link>
          <Link href="/privacy-policy" style={linkStyle}>
            Privacy Policy
          </Link>
          <Link href="/privacy-policy#california-privacy-notice" style={linkStyle}>
            CCPA Notice
          </Link>
          <Link href="/opt-out" style={linkStyle}>
            ⚖ Your Privacy Choices
          </Link>
        </div>

        {/* GET ON THE LIST */}
        <div className="flex-1">
          <p style={headingStyle}>Get on the List</p>
          <p
            style={{
              fontSize: "14px",
              fontFamily: "var(--font-courier)",
              color: "#171717",
              marginBottom: "16px",
            }}
          >
            We&apos;ll send you email notifications on events and new releases.
          </p>
          <input
            type="email"
            placeholder="Your email"
            style={{
              border: "1px solid black",
              paddingLeft: "16px",
              fontSize: "16px",
              width: "100%",
              height: "52px",
              fontFamily: "var(--font-courier)",
              outline: "none",
              display: "block",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#171717",
              color: "white",
              padding: "16px 25px",
              fontSize: "16px",
              fontFamily: "var(--font-courier)",
              border: "none",
              cursor: "pointer",
              width: "100%",
              marginTop: "8px",
              display: "block",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom row */}
      <div
        className="flex justify-between items-center"
        style={{
          borderTop: "1px solid #171717",
          padding: "16px 40px",
          fontSize: "12px",
          fontFamily: "var(--font-courier)",
        }}
      >
        <span>© 2025 GALLERY DEPT.</span>
        <Link
          href="/"
          style={{
            fontSize: "12px",
            fontFamily: "var(--font-courier)",
            color: "#171717",
            textDecoration: "none",
          }}
        >
          GALLERY DEPT.
        </Link>
      </div>
    </footer>
  );
}
