'use client';

import { AnimatePresence, motion, useDragControls } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Close } from './Icons';

const drawer = [0.32, 0.72, 0, 1];

export default function Sheet({ open, onClose, title, children }) {
  const controls = useDragControls();
  const panel = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    addEventListener('keydown', onKey);
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    requestAnimationFrame(() => panel.current?.focus());
    return () => {
      removeEventListener('keydown', onKey);
      html.style.overflow = '';
      prev?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-40">
          <motion.div
            className="absolute inset-0 bg-graphite/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col border-t-2 border-graphite bg-film outline-none"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{
              y: '100%',
              transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
            }}
            transition={{ duration: 0.36, ease: drawer }}
            drag="y"
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.9 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 500) onClose();
            }}
          >
            <div
              className="grid touch-none grid-cols-[1fr_auto] items-center border-b border-graphite pl-4"
              onPointerDown={(e) => controls.start(e)}
            >
              <h2 className="caption">{title}</h2>
              <button
                type="button"
                className="btn icon quiet m-1.5"
                aria-label="Close"
                onClick={onClose}
              >
                <Close />
              </button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-4 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
