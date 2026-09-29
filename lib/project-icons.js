export const projectIcon = (slug) => {
  if (slug === 'redline') return '/icon.svg';
  if (slug === 'movievault' || slug === 'portfolio') {
    return `/project-icons/${slug}.png`;
  }
  return `/project-icons/${slug}.svg`;
};
