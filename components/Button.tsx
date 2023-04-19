import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

interface Props {
  onClick?: () => void;
  href?: string;
  className?: string;
  [key: string]: any;
}

const Button: React.FC<Props> = ({
  onClick,
  href,
  children,
  className,
  ...rest
}) => {
  const isLink = !!href;
  const Element = isLink ? "a" : "button";

  return (
    <Element
      href={href}
      className={cx("button", className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Element>
  );
};

export default Button;
