import type { JSX } from 'react'

type TechnologyIconProps = {
  technology: string
}

const LetterMark = ({ label, color, textColor = '#07101f' }: { label: string; color: string; textColor?: string }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <rect x="2" y="2" width="28" height="28" rx="2" fill={color} />
    <text x="16" y="21.2" textAnchor="middle" fill={textColor} fontFamily="Arial, sans-serif" fontSize={label.length > 2 ? '10' : '15'} fontWeight="700">{label}</text>
  </svg>
)

const icons: Record<string, () => JSX.Element> = {
  React: () => <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="2.3" fill="currentColor" /><g fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="16" cy="16" rx="12.5" ry="5" /><ellipse cx="16" cy="16" rx="12.5" ry="5" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="12.5" ry="5" transform="rotate(120 16 16)" /></g></svg>,
  TypeScript: () => <LetterMark label="TS" color="#3178c6" textColor="white" />,
  JavaScript: () => <LetterMark label="JS" color="#f7df1e" />,
  HTML: () => <LetterMark label="5" color="#e34f26" textColor="white" />,
  CSS: () => <LetterMark label="3" color="#1572b6" textColor="white" />,
  PHP: () => <LetterMark label="PHP" color="#777bb4" textColor="white" />,
  Docker: () => <svg viewBox="0 0 32 32" aria-hidden="true"><g fill="#2496ed"><rect x="8" y="8" width="4" height="4" /><rect x="13" y="8" width="4" height="4" /><rect x="18" y="8" width="4" height="4" /><rect x="13" y="13" width="4" height="4" /><rect x="18" y="13" width="4" height="4" /><path d="M6 18h17c1 0 2-1 2-2h2c0 3.5-2.8 7-7.3 7H16C10.5 23 7.3 20.6 6 18Z" /></g></svg>,
  MySQL: () => <svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="16" cy="7" rx="10" ry="4" fill="none" stroke="#4b9dbf" strokeWidth="2" /><path d="M6 7v12c0 2.2 4.5 4 10 4s10-1.8 10-4V7M6 13c0 2.2 4.5 4 10 4s10-1.8 10-4" fill="none" stroke="#4b9dbf" strokeWidth="2" /></svg>,
  Git: () => <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m16 3 13 13-13 13L3 16 16 3Z" fill="#f05033" /><path d="M12 12v8m0-4h8m-3-3v6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>,
}

export function TechnologyIcon({ technology }: TechnologyIconProps) {
  const Icon = icons[technology]

  if (Icon) return <Icon />

  // Fallback para nuevas tecnologías: aparece hasta que agregues su icono arriba.
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4v24M4 16h24M7.5 7.5l17 17M24.5 7.5l-17 17" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
}
