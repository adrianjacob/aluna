import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames/bind";
import styles from "./Option.module.scss";

const cx = classNames.bind(styles);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
  onClick: () => void;
};

const Option: React.FC<Props> = ({ children, isActive = false, onClick }) => {
  return (
    <button
      className={cx("option", isActive && "active")}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Option;
