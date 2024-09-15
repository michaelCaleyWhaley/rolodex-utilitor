import react from "react";

function Button({
  text,
  className,
  onClick,
  type = "button",
  children,
}: {
  text?: string;
  className?: string;
  onClick: (_e: react.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
  children?: react.ReactElement;
}) {
  return (
    <button type={type} {...(className && { className })} onClick={onClick}>
      {text && text}
      {children && children}
    </button>
  );
}

export { Button };
