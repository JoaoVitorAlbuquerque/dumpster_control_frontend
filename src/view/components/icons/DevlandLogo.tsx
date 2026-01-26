export function DevlandLogo() {
  return (
    <svg
      width="250"
      height="100"
      viewBox="0 0 600 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00C6FF" stopOpacity={1} />
          <stop offset="100%" stopColor="#0072FF" stopOpacity={1} />
        </linearGradient>
      </defs>

      <rect width="600" height="200" rx="20" fill="#0F172A" />

      <g transform="translate(40,50)">
        <rect x="0" y="0" width="100" height="100" rx="12" fill="url(#grad)" />
        <text
          x="50"
          y="65"
          fontSize="48"
          textAnchor="middle"
          fill="white"
          fontFamily="monospace"
        >
          &lt;/&gt;
        </text>
      </g>

      <text
        x="180"
        y="115"
        fontSize="64"
        fill="white"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
      >
        Code<tspan fill="url(#grad)">Land</tspan>
      </text>

      <text
        x="185"
        y="145"
        fontSize="24"
        fill="#94A3B8"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        Software Solutions
      </text>
    </svg>
  );
}
