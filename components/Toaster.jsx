'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSyncExternalStore } from 'react';
import { snapshot, subscribe } from '@/lib/toast';

export default function Toaster() {
  const t = useSyncExternalStore(subscribe, snapshot, () => null);
  return (
    <div aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="popLayout">
        {t ? (
          <motion.div
            key={t.id}
            className="toast"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 4,
              scale: 0.98,
              transition: { duration: 0.14 },
            }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="t">{t.title}</span>
            <span>{t.text}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
