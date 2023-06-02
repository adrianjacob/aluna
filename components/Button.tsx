import React, { forwardRef, RefObject } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  href?: string;
  variant?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { onClick, href, children, variant = "primary", className, ...rest },
    ref: RefObject<HTMLButtonElement & HTMLAnchorElement>
  ) => {
    const isLink = !!href;
    const Element = isLink ? "a" : "button";

    return (
      <button
        // href={href}
        className={cx("button", variant, className)}
        onClick={onClick}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
