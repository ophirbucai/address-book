type StarPropsWithoutOnClick = Omit<React.ComponentProps<"span">, "onClick">;
type StarPropsWithOnClick = React.ComponentProps<"button">;

type StarProps =
  | (StarPropsWithoutOnClick & { onClick?: never })
  | (StarPropsWithOnClick & {
      onClick: Required<StarPropsWithOnClick>["onClick"];
    });
import style from "./star.module.css";

export function Star({ onClick, className, ...rest }: StarProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} ${style.star}`}
        {...(rest as StarPropsWithOnClick)}
      >
        ★
      </button>
    );
  }

  return <span className={`${className} ${style.star}`} {...rest}>★</span>;
}
