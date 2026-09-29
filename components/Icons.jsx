const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
};

const Icon = ({ size = 18, children, ...rest }) => (
  <svg aria-hidden="true" {...base} width={size} height={size} {...rest}>
    {children}
  </svg>
);

export const Feed = (p) => (
  <Icon {...p}>
    <path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" />
    <rect
      x="4.5"
      y="17.5"
      width="2"
      height="2"
      fill="currentColor"
      stroke="none"
    />
  </Icon>
);

export const Copy = (p) => (
  <Icon {...p}>
    <path d="M9 9h10v10H9z" />
    <path d="M15 9V5H5v10h4" />
  </Icon>
);

export const DrawingsIcon = (p) => (
  <Icon {...p}>
    <path d="M5 7h11v13H5zM8 4h11v13" />
  </Icon>
);

export const Out = (p) => (
  <Icon {...p}>
    <path d="M8 16 17 7M9 7h8v8" />
  </Icon>
);

export const Back = (p) => (
  <Icon {...p}>
    <path d="M19 12H6M11 7l-5 5 5 5" />
  </Icon>
);

export const Down = (p) => (
  <Icon {...p}>
    <path d="m7 10 5 5 5-5" />
  </Icon>
);

export const Close = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const Plus = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const Up = (p) => (
  <Icon {...p}>
    <path d="m7 14 5-5 5 5" />
  </Icon>
);

export const Trash = (p) => (
  <Icon {...p}>
    <path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13" />
  </Icon>
);

export const Pull = (p) => (
  <Icon {...p}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M6 8v8M18 16V9a2 2 0 0 0-2-2h-5M13 4l-3 3 3 3" />
  </Icon>
);
