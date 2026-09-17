export default function SearchField({
  label,
  placeholder,
  variant = "input",
  withDivider = false,
}) {
  return (
    <div
      className={[
        "relative px-4 py-3 flex flex-col gap-0.5",
        withDivider
          ? "md:border-l md:border-neutral-200 dark:md:border-border"
          : "",
      ].join(" ")}
    >
      <label className="text-xs font-semibold text-neutral-700 dark:text-foreground">
        {label}
      </label>

      {variant === "select" ? (
        <div className="relative">
          <select
            className="appearance-none w-full bg-transparent
                       text-sm text-neutral-500 dark:text-muted-foreground
                       pr-6 focus:outline-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>
              {placeholder}
            </option>
          </select>
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2
                           text-neutral-400 dark:text-muted-foreground">
            <ChevronDownIcon />
          </span>
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent text-sm
                     text-neutral-700 dark:text-foreground
                     placeholder:text-neutral-500 dark:placeholder:text-muted-foreground
                     focus:outline-none"
        />
      )}
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}