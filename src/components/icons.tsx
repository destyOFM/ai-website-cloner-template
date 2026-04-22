interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  color?: string;
}

export function GalleryDeptLogo({ className, width = "100%", height = "100%", fill = "currentColor", color }: IconProps) {
  const resolvedFill = color ?? fill;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 754.84 349.75"
      className={className}
      fill={resolvedFill}
    >
      <rect x="610.89" y="321.07" width="29.8" height="28.57" />
      <path d="m228.3,276.06c0-26.62-9.94-66.93-58.01-66.93h-62.98v140.51h61.79c47.08,0,59.2-43.45,59.2-73.58Zm-91.78,49.32v-91.98h28.61c12.71,0,32.78,3.33,32.78,44.82,0,23.09-8.15,47.16-32.38,47.16h-29.01Z" />
      <path d="m487.16,254.14c0-27.59-16.69-45.01-44.31-45.01h-65.16v140.51h29.8v-50.69h34.17c38.34,0,45.5-32.09,45.5-44.81Zm-79.67,20.55v-41.29h23.64c18.48,0,26.23,5.68,26.23,19.38,0,6.26,0,21.92-22.25,21.92h-27.61Z" />
      <polygon points="277.65 288.39 347.18 288.39 347.18 263.53 277.65 263.53 277.65 233.98 353.34 233.98 353.34 209.13 248.44 209.13 248.44 349.64 356.72 349.64 356.72 324.79 277.65 324.79 277.65 288.39" />
      <polygon points="570.18 349.64 570.18 233.98 613.29 233.98 613.29 209.13 497.27 209.13 497.27 233.98 540.38 233.98 540.38 349.64 570.18 349.64" />
      <path d="m103.09,160.93v-84.5h-49.6v23.07h20.65c.64,23.69-4.9,41.52-21.92,41.52-20.44,0-21.5-21.18-21.5-34.18v-43.61c0-12.16-1.91-39.63,21.5-39.63,20.22.84,21.29,13.42,21.71,29.36h29.8c-.21-6.29,0-12.79-1.49-19.08C95.43,6.6,77.76.11,52.22-.11,4.54-.11,1.34,29.67.07,69.72v22.44c0,41.94,3.19,72.55,52.15,72.55,10.85-.84,22.14-5.45,28.1-21.81h.42v18.03h22.35Z" />
      <polygon points="517.35 137.86 463.28 137.86 463.28 89.43 513.09 89.43 513.09 66.36 463.28 66.36 463.28 26.73 517.35 26.73 517.35 3.67 433.48 3.67 433.48 160.93 517.35 160.93 517.35 137.86" />
      <polygon points="423.69 137.86 368.35 137.86 368.35 3.67 338.55 3.67 338.55 160.93 423.69 160.93 423.69 137.86" />
      <path d="m562.56,93.2h5.32c8.51,0,17.24-.21,25.33,2.1,10.22,2.94,10.01,16.15,10.22,25.79.21,10.48-.43,29.77,3.19,39.84h32.78v-2.93c-7.24-4.61-6.38-43.19-6.38-49.69,0-15.1-5.32-26.21-22.99-28.52v-.42c20.01-2.73,24.48-20.76,24.48-37.95,0-28.94-19.58-37.74-45.34-37.74h-56.41v157.26h29.8v-67.73Zm0-66.47h22.14c11.28.21,18.73,3.15,18.73,20.76,0,15.73-7.66,22.02-17.46,22.65h-23.41V26.73Z" />
      <polygon points="327.91 137.86 272.56 137.86 272.56 3.67 242.77 3.67 242.77 160.93 327.91 160.93 327.91 137.86" />
      <path d="m155.66,121.09h34.91l7.88,39.84h31.93L194.19,3.67h-40.23l-38.1,157.26h31.93l7.88-39.84Zm13.62-67.73c1.49-7.34,2.13-14.47,2.98-21.81.21-3.57.64-7.13,1.06-10.48h.43c.43,3.36.85,6.92,1.07,10.48.85,7.34,1.49,14.47,2.98,21.81l8.09,44.66h-25.54l8.94-44.66Z" />
      <path d="m682.97,160.93h29.8v-66.89L754.92,3.67h-32.57l-14.26,35.65c-3.62,8.81-7.66,17.61-9.79,29.77h-.43c-1.28-8.39-3.83-16.36-7.03-24.11l-16.81-41.31h-32.57l41.51,90.37v66.89Z" />
    </svg>
  );
}

export function SearchIcon({ className, width = 20, height = 20, color = "currentColor" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export function AccountIcon({ className, width = 20, height = 20, color = "currentColor" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function WishlistIcon({ className, width = 20, height = 20, color = "currentColor" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function CartIcon({ className, width = 20, height = 20, color = "currentColor" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function ChevronDownIcon({ className, width = 12, height = 12, color = "currentColor" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
