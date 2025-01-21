type StarProps<T extends Function | undefined> = T extends Function
? React.ComponentProps<"button">
  : Omit<React.ComponentProps<"span">, 'onClick'>;

import style from "./star.module.css";

export function Star<T extends Function>({ onClick, className, ...rest }: StarProps<T>) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} ${style.star}`}
        {...rest}
      >
        ★
      </button>
    );
  }
  
  return (
    <span className={`${className} ${style.star}`} {...rest}>
      ★
    </span>
  );
}
