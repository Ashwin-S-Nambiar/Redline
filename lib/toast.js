let current = null;
let timer = 0;
let seq = 0;
const listeners = new Set();

const emit = () => {
  for (const l of listeners) l();
};

export function toast(title, text, ms = 2600) {
  clearTimeout(timer);
  seq += 1;
  current = { id: seq, title, text };
  emit();
  timer = setTimeout(() => {
    current = null;
    emit();
  }, ms);
}

export const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const snapshot = () => current;

export async function copy(text, what) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied', what);
  } catch {
    toast(
      'Not copied',
      'Your browser blocked the clipboard. Select the link and copy it.',
    );
  }
}
