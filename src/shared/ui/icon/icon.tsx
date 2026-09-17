export type IconName =
  'construction' | 'factory' | 'monitor' | 'move' | 'scan' | 'warehouse'

type IconProps = {
  name: IconName
  size?: number
}

export function Icon({ name, size = 24 }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    construction: (
      <>
        <path d="M4 15a8 8 0 0 1 16 0" />
        <path d="M3 15h18v3H3z" />
        <path d="M9 7v5M15 7v5" />
      </>
    ),
    factory: (
      <>
        <path d="M3 21V10l6 3V9l6 4V7h4v14" />
        <path d="M3 21h18M7 17h2M13 17h2" />
      </>
    ),
    monitor: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="m7 12 3-3 2 2 4-4" />
      </>
    ),
    move: (
      <>
        <path d="M5 12h14" />
        <path d="m15 8 4 4-4 4" />
        <circle cx="5" cy="12" r="2" />
      </>
    ),
    scan: (
      <>
        <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    warehouse: (
      <>
        <path d="m3 10 9-6 9 6v11H3z" />
        <path d="M7 21v-7h10v7M7 17h10" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      {paths[name]}
    </svg>
  )
}
