import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  href?: string;
  variant?: string;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { onClick, href, children, variant = "primary", className, ...rest },
    ref
  ) => {
    const isLink = !!href;
    const Element = isLink ? "a" : "button";

    return (
      <Element
        href={href}
        className={cx("button", variant, className)}
        onClick={onClick}
        {...rest}
        ref={ref}
      >
        {children}
      </Element>
    );
  }
);

export default Button;
