import { useNavigate } from "react-router";
import style from "./back-button.module.css";
import { useEffect } from "react";
import { animate } from "motion/react";

export function BackButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const navigate = useNavigate();
  useEffect(() => {
    animate(
      `.${style.backButton}`,
      {
        opacity: 1,
      },
      {
        delay: 1,
      },
    );
  });

  function handleBackNavigate(e: React.MouseEvent<HTMLButtonElement>) {
    if (props?.onClick) props.onClick(e);
    navigate(-1);
  }
  return (
    <button
      {...props}
      className={`${className} ${style.backButton}`}
      onClick={handleBackNavigate}
    >
      <span className={style.backButtonArrow}>←</span> {children || "Back"}
    </button>
  );
}
