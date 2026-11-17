import React from 'react';
import { bbbAccreditation as bbb } from '../content/government';

// BBB's dynamic seal: the only way the BBB marks show on the site (BBB Trademark Usage Guidelines, read in Bruce's BBB
// portal on 2026-11-17). The image is BBB's compact 160x82 seal (ACCREDITED BUSINESS, Click for Profile, no rating),
// hot-linked from BBB's own seal server and shown as BBB serves it: never copied into this repo, altered, recolored,
// cropped or redrawn. It links to the BBB Business Profile, and "Click for Review" sits right next to it with the same
// link. The rating is never written as text anywhere. BBB accreditation is not a government certification: keep it apart
// from the SBA, SAM.gov and California records. scripts/check_government_capabilities.py and scripts/verify-routes.mjs
// hold these rules.
//
// The layout is "Option A · Badge" (Bruce, 2026-11-17), the same everywhere the seal shows: the seal, a Signal rule, and
// three lines beside it. On light themes the seal sits on the page; on dark ones it sits on a small Bone plate
// (.bbb-plate in index.css), because its "Click for Profile" is blue on a see-through background.

/** The profile link, as BBB's own seal code writes it. */
export const BBB_HREF = `${bbb.profileUrl}/#sealclick`;

export const BbbSeal: React.FC<{ className?: string; lazy?: boolean }> = ({ className = '', lazy = true }) => (
  <div data-bbb-seal className={`flex w-fit items-center ${className}`}>
    <a href={BBB_HREF} target="_blank" rel="nofollow noopener" className="bbb-plate block shrink-0">
      <img src={bbb.seal.url} alt={bbb.seal.alt} width={bbb.seal.width} height={bbb.seal.height} style={{ border: 0 }}
        loading={lazy ? 'lazy' : 'eager'} className="block max-w-none" />
    </a>
    <div className="ml-3 flex min-w-0 flex-col justify-center self-stretch border-l-[3px] border-signal pl-3">
      {/* a step smaller on phones, and it may wrap to two lines where a theme's display face is wide (Island Delicacy) */}
      <p className="display text-xl leading-none sm:text-2xl">BBB Accredited</p>
      <p className="label mt-1.5 whitespace-nowrap">Since {bbb.accreditedSinceShort}</p>
      <a href={BBB_HREF} target="_blank" rel="nofollow noopener"
        className="-mb-2 inline-flex min-h-[44px] items-center whitespace-nowrap text-sm font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4 hover:decoration-[3px]">
        Click for Review<span aria-hidden="true">&nbsp;→</span>
      </a>
    </div>
  </div>
);
