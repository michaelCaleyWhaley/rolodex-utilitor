import { MouseEvent } from "react";

function Button({
  text,
  className,
  onClick,
  type = "button",
}: {
  text?: string;
  className?: string;
  onClick: (_e: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button type={type} {...(className && { className })} onClick={onClick}>
      {text && text}
    </button>
  );
}

export { Button };
