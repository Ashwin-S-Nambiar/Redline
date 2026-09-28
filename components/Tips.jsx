'use client';

import { useEffect } from 'react';
import { initTips } from '@/lib/tip';

let started = false;

export default function Tips() {
  useEffect(() => {
    if (started) return;
    started = true;
    initTips();
  }, []);
  return null;
}
