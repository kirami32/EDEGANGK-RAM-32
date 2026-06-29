import type { Social } from "@/data/crew";

const paths: Record<Social["icon"], React.ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none" />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M7 9.5c3.4-1 6.8-.6 9.4 1" />
      <path d="M7.5 12.6c2.8-.8 5.6-.4 7.7 1" />
      <path d="M8 15.6c2.2-.6 4.3-.3 6 .8" />
    </>
  ),
  soundcloud: (
    <>
      <path d="M4 16v-4M7 16v-6M10 16v-8M13 16V7" />
      <path d="M13 16h5a3 3 0 0 0 .2-6c-.5-2.6-2.8-4.5-5.2-4.5" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" />
      <path d="M14 4c.4 2.2 2 3.8 4 4" />
    </>
  ),
};

export function Icon({ name, className }: { name: Social["icon"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
