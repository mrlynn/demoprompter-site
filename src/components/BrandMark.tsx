type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({
  className,
  title = "Demo Prompter",
}: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect x="26" y="10" width="28" height="8" rx="4" fill="#F4F1EA" />
      <rect x="17" y="24" width="46" height="8" rx="4" fill="#F4F1EA" />
      <rect x="8" y="38" width="64" height="8" rx="4" fill="#E8913A" />
      <rect x="17" y="52" width="46" height="8" rx="4" fill="#F4F1EA" />
      <rect x="26" y="66" width="28" height="8" rx="4" fill="#F4F1EA" />
    </svg>
  );
}
