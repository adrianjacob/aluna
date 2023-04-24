import React from "react";
import classNames from "classnames/bind";
import styles from "./Badge.module.scss";

const cx = classNames.bind(styles);

type Props = {
  isOrdered?: boolean;
};
const Badge: React.FC<Props> = ({ isOrdered = false }) => {
  return (
    <div className={cx("badge", isOrdered && "order")}>
      {isOrdered ? "Order" : "Quote"}
    </div>
  );
};

export default Badge;
