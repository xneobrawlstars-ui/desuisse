'use client';

interface Props {
  dark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ dark = true, size = 'md' }: Props) {
  const widths = { sm: 110, md: 150, lg: 200 };
  const w = widths[size];
  const textColor = dark ? '#1a0a0a' : '#ffffff';
  const subColor = dark ? '#c9a84c' : 'rgba(201,168,76,0.9)';

  return (
    <svg viewBox="0 0 200 55" xmlns="http://www.w3.org/2000/svg"
      style={{ width: w, height: 'auto', display: 'block' }}>
      <text x="100" y="28" textAnchor="middle" dominantBaseline="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="26" fontWeight="300" fill={textColor} letterSpacing="3">
        deSuisse
      </text>
      <text x="100" y="46" textAnchor="middle" dominantBaseline="middle"
        fontFamily="Montserrat, Arial, sans-serif"
        fontSize="6" fontWeight="400" fill={subColor} letterSpacing="3.5">
        LUXURY JEWELLERY
      </text>
    </svg>
  );
}