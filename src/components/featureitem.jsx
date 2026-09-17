export default function FeatureItem({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="shrink-0 mt-0.5 text-foreground/70"
        aria-hidden="true"
      >
        {icon}
      </span>

      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-foreground leading-tight">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {subtitle}
        </p>
      </div>
    </div>
  );
}