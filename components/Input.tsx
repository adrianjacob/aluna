import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

type Props = {
  className?: string;
  isTextArea?: boolean;
};

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props &
    (
      | InputHTMLAttributes<HTMLInputElement>
      | TextareaHTMLAttributes<HTMLTextAreaElement>
    )
>(({ className, isTextArea = false, ...rest }, ref) =>
  isTextArea ? (
    <textarea
      cols={50}
      rows={5}
      className={cx("input")}
      ref={ref as React.Ref<HTMLTextAreaElement>}
      {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  ) : (
    <input
      className={cx("input", className)}
      ref={ref as React.Ref<HTMLInputElement>}
      {...(rest as InputHTMLAttributes<HTMLInputElement>)}
    />
  )
);

export default Input;
