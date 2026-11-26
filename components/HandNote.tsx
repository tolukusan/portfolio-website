export default function HandNote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-hand text-lg text-ink/70 ${className}`.trim()}>
      {children}
    </span>
  );
}
