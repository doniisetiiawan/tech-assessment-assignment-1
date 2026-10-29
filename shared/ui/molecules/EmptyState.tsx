interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  hint?: string;
}

export default function EmptyState({ icon, title, hint }: EmptyStateProps) {
  return (
    <div className="empty">
      {icon}
      <h1>{title}</h1>
      {hint && <p>{hint}</p>}
    </div>
  );
}
