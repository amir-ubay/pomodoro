export function Button({
  children,
  color = "orange",
  size = "small",
}: {
  children: React.ReactNode;
  color: string;
  size: "small" | "medium" | "large";
}) {
  let sizeClass;

  switch (size) {
    case "small":
      sizeClass = "py-2 px-3";
      break;
    case "medium":
      sizeClass = "py-3 px-4";
      break;
    case "large":
      sizeClass = "py-4 sm:px-5";
      break;
  }

  return (
    <button
      type="button"
      className={`${sizeClass} inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-${color}-700 text-white hover:bg-${color}-700 focus:outline-none focus:bg-${color}-700 disabled:opacity-50 disabled:pointer-events-none`}
    >
      {children}
    </button>
  );
}

export function PomoButton({
  children,
  size = "small",
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  size: "small" | "medium" | "large";
  isActive: boolean;
  onClick:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}) {
  let sizeClass;

  switch (size) {
    case "small":
      sizeClass = "py-2 px-3";
      break;
    case "medium":
      sizeClass = "py-3 px-4";
      break;
    case "large":
      sizeClass = "py-4 sm:px-5";
      break;
  }

  var bgColor = isActive ? `bg-white bg-opacity-35` : null;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${sizeClass} transition-all inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white ${bgColor} focus:outline-none sdisabled:opacity-50 disabled:pointer-events-none`}
    >
      {children}
    </button>
  );
}

export function ButtonLarge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <button
      type="button"
      className={`"py-4 sm:py-5 px-20 inline-flex items-center gap-x-2 text-sm font-extrabold rounded-md bg-white text-${color}-700 disabled:pointer-events-none" shadow-2xl`}
    >
      {children}
    </button>
  );
}
