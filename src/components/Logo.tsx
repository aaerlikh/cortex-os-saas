import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'full' | 'text';
  withGlow?: boolean;
}

export default function Logo({ 
  size = 'md', 
  variant = 'full',
  withGlow = true 
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 24, text: 14 },
    md: { icon: 32, text: 18 },
    lg: { icon: 48, text: 24 },
  };

  const dimensions = sizeMap[size];

  if (variant === 'icon') {
    return (
      <div className={`relative ${withGlow ? 'neon-glow-blue' : ''}`}>
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Outer glow effect */}
          {withGlow && (
            <defs>
              <filter id="neon-blur">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0066cc', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          )}

          {/* Pixel-style 'A' with gradient */}
          <g filter={withGlow ? 'url(#neon-blur)' : 'none'}>
            {/* Vertical bars of A */}
            <rect x="8" y="12" width="6" height="28" fill="url(#logoGradient)" rx="1" />
            <rect x="34" y="12" width="6" height="28" fill="url(#logoGradient)" rx="1" />
            
            {/* Horizontal bar of A */}
            <rect x="8" y="22" width="32" height="6" fill="url(#logoGradient)" rx="1" />
            
            {/* Top point of A */}
            <rect x="19" y="6" width="10" height="6" fill="url(#logoGradient)" rx="1" />
          </g>

          {/* Neon outline */}
          {withGlow && (
            <>
              <rect x="8" y="12" width="6" height="28" fill="none" stroke="#0066cc" strokeWidth="1" rx="1" opacity="0.5" />
              <rect x="34" y="12" width="6" height="28" fill="none" stroke="#06b6d4" strokeWidth="1" rx="1" opacity="0.5" />
              <rect x="8" y="22" width="32" height="6" fill="none" stroke="#9333ea" strokeWidth="1" rx="1" opacity="0.5" />
              <rect x="19" y="6" width="10" height="6" fill="none" stroke="#0066cc" strokeWidth="1" rx="1" opacity="0.5" />
            </>
          )}
        </svg>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="flex items-baseline gap-1">
        <span
          className={`font-black bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent tracking-tight`}
          style={{ fontSize: `${dimensions.text}px` }}
        >
          Erlich
        </span>
        <span
          className={`font-black text-blue-400 tracking-tight`}
          style={{ fontSize: `${dimensions.text}px` }}
        >
          AI
        </span>
      </div>
    );
  }

  // Full variant: icon + text
  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${withGlow ? 'neon-glow-blue' : ''}`}>
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <filter id="neon-blur-full">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="logoGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#0066cc', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <g filter={withGlow ? 'url(#neon-blur-full)' : 'none'}>
            <rect x="8" y="12" width="6" height="28" fill="url(#logoGradientFull)" rx="1" />
            <rect x="34" y="12" width="6" height="28" fill="url(#logoGradientFull)" rx="1" />
            <rect x="8" y="22" width="32" height="6" fill="url(#logoGradientFull)" rx="1" />
            <rect x="19" y="6" width="10" height="6" fill="url(#logoGradientFull)" rx="1" />
          </g>

          {withGlow && (
            <>
              <rect x="8" y="12" width="6" height="28" fill="none" stroke="#0066cc" strokeWidth="1" rx="1" opacity="0.5" />
              <rect x="34" y="12" width="6" height="28" fill="none" stroke="#06b6d4" strokeWidth="1" rx="1" opacity="0.5" />
              <rect x="8" y="22" width="32" height="6" fill="none" stroke="#9333ea" strokeWidth="1" rx="1" opacity="0.5" />
              <rect x="19" y="6" width="10" height="6" fill="none" stroke="#0066cc" strokeWidth="1" rx="1" opacity="0.5" />
            </>
          )}
        </svg>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span
            className={`font-black bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent tracking-tight`}
            style={{ fontSize: `${dimensions.text}px` }}
          >
            Erlich
          </span>
          <span
            className={`font-black text-blue-400 tracking-tight`}
            style={{ fontSize: `${dimensions.text}px` }}
          >
            AI
          </span>
        </div>
        <p className="text-xs text-gray-400 font-mono">CORTEX OS 4.0</p>
      </div>
    </div>
  );
}
