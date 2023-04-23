import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Panel.module.scss";

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
  isPadding?: boolean;
};

const Panel: React.FC<Props> = ({ children, isPadding }) => (
  <>
    <main className={cx("panel", isPadding && "padding")}>{children}</main>
  </>
);

export default Panel;
