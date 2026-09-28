'use client';

import { SITE } from '@/lib/format';
import { copy } from '@/lib/toast';
import { Copy } from './Icons';

export default function CopyLink({ path }) {
  return (
    <button
      type="button"
      className="btn icon quiet"
      data-tip="Copy link"
      aria-label="Copy a link to this revision"
      onClick={() => copy(`${SITE}${path}`, 'A link to this revision.')}
    >
      <Copy size={17} />
    </button>
  );
}
