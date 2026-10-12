import React, { useState } from 'react';
import kirinyagaCrest from '../assets/image_5.png';

interface ChurchCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
}

export const ChurchCrest: React.FC<ChurchCrestProps> = ({ 
  className = '', 
  size = 'md',
  title = "ACK Diocese of Kirinyaga Crest"
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 p-0.5',
    md: 'w-12 h-12 p-1',
    lg: 'w-16 h-16 p-1.5',
    xl: 'w-20 h-20 p-2'
  };

  return (
    <div 
      className={`relative shrink-0 rounded-full bg-white border-2 border-amber-500/80 shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-102 ${sizeClasses[size]} ${className}`}
      title={title}
    >
      {!imgError ? (
        <img
          src={kirinyagaCrest}
          alt="ACK Diocese of Kirinyaga Official Crest"
          className="w-full h-full object-contain select-none"
          loading="eager"
          onError={() => {
            // Attempt fallback to public path if asset bundle encounters any issues
            setImgError(true);
          }}
        />
      ) : (
        <img
          src="/image_5.png"
          alt="ACK Diocese of Kirinyaga Official Crest"
          className="w-full h-full object-contain select-none"
          loading="eager"
        />
      )}
    </div>
  );
};

