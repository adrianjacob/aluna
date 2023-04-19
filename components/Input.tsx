import React, { InputHTMLAttributes } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

type Props = {
  type?: string;
  className?: string;
  [key: string]: any;
};

const Input = React.forwardRef<
  HTMLInputElement,
  Props & InputHTMLAttributes<HTMLInputElement>
>(({ isUppercase = false, className, ...rest }, ref) => (
  <input className={cx("input", className)} ref={ref} {...rest} />
));

export default Input;
