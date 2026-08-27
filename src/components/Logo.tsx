import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-[#192f75]',
  subtextColor = 'text-[#192f75]',
}) => {
  const sizeMap = {
    sm: { iconSize: 32, textClass: 'text-base', subClass: 'text-[9px] tracking-widest' },
    md: { iconSize: 44, textClass: 'text-xl', subClass: 'text-[11px] tracking-[0.2em]' },
    lg: { iconSize: 60, textClass: 'text-2xl', subClass: 'text-xs tracking-[0.25em]' },
    xl: { iconSize: 84, textClass: 'text-3xl', subClass: 'text-sm tracking-[0.3em]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`} id="school-brand-logo">
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: currentSize.iconSize, height: currentSize.iconSize * 1.15 }}
      >
        {/* SVG Vector Logo matching Attaufiq School Seal */}
        <svg
          viewBox="0 0 200 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Sun with Rays (Top Right) */}
          <g transform="translate(125, 30)">
            {/* Center Sun */}
            <circle cx="0" cy="0" r="16" fill="#F5B318" />
            {/* Sun Rays (12 pointed rays) */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <polygon
                key={i}
                points="-3,-19 0,-28 3,-19"
                fill="#F5B318"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>

          {/* Yellow swoosh stream ascending to the sun */}
          <path
            d="M 120 152 C 145 130 150 75 125 35 C 137 60 135 110 115 145 Z"
            fill="#F5B318"
          />

          {/* Light Blue / Cyan swoosh stream */}
          <path
            d="M 80 156 C 110 140 140 85 125 35 C 132 65 115 120 75 152 Z"
            fill="#29A8E0"
          />

          {/* Main Deep Navy Human Parent Figure & Arch */}
          <path
            d="M 50 115 C 60 145 105 145 130 45 C 122 75 90 135 60 118 C 55 115 50 113 50 115 Z"
            fill="#1E3888"
          />

          {/* Parent Head */}
          <circle cx="102" cy="90" r="14" fill="#1E3888" />

          {/* Child Figure Base & Swoosh */}
          <path
            d="M 50 115 C 65 140 95 138 108 120 C 85 130 65 125 50 115 Z"
            fill="#1E3888"
          />

          {/* Child Head */}
          <circle cx="78" cy="110" r="11" fill="#1E3888" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-black ${currentSize.textClass} ${textColor} tracking-tight font-sans`}
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            Attaufiq
          </span>
          <span
            className={`font-extrabold uppercase ${currentSize.subClass} ${subtextColor} mt-1`}
            style={{ letterSpacing: '0.18em' }}
          >
            Sekolah Islam
          </span>
        </div>
      )}
    </div>
  );
};
