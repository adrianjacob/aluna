import React, { LabelHTMLAttributes } from "react";
import classNames from "classnames/bind";
import styles from "./Label.module.scss";

const cx = classNames.bind(styles);

type Props = LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<Props> = ({ children }) => {
  return <label className={cx("label")}>{children}</label>;
};

export default Label;
