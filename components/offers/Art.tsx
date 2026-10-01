import React from 'react';
import { PhotoPanel } from '../brand';
import { STILLS } from '../../content/media';

/** A content/media.ts still in a photo panel; while the slot is null it shows a designed placeholder, never a broken image. */
export const SlotArt: React.FC<{ slot: keyof typeof STILLS | string; label: string; placeholder: string; className?: string; tilt?: number }> = ({ slot, label, placeholder, className = '', tilt }) => {
  const art = STILLS[slot];
  return (
    <PhotoPanel tilt={tilt} className={className} label={label}>
      {art ? <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" className="h-full w-full object-cover" /> : (
        <div className="grid h-full w-full place-items-center bg-paper p-6 text-paper-ink" role="img" aria-label={`${label}: art coming`}>
          <span className="display text-center text-5xl opacity-15 md:text-6xl">{placeholder}</span>
        </div>
      )}
    </PhotoPanel>
  );
};
