import React from "react";
import classNames from "classnames/bind";
import styles from "./Preview.module.scss";

const cx = classNames.bind(styles);

type Props = {
  rightDoors?: number;
  leftDoors?: number;
  frameColor?: string;
  pos?: string;
};

const Door: React.FC<Props> = ({ pos, frameColor }) => {
  return (
    <div className={cx("door", frameColor.split(" ")[0].toLocaleLowerCase())}>
      <div className={cx("pos")}>{pos}</div>
    </div>
  );
};

const Preview: React.FC<Props> = ({ leftDoors, rightDoors, frameColor }) => {
  return (
    <>
      <div className={cx("preview")}>
        {Array.from({ length: leftDoors }).map((index) => (
          <Door pos="L" key={`left-${index}`} frameColor={frameColor} />
        ))}
        {Array.from({ length: rightDoors }).map((index) => (
          <Door pos="R" key={`right-${index}`} frameColor={frameColor} />
        ))}
      </div>
      <div className={cx("help")}>Viewed from the outside</div>
    </>
  );
};

export default Preview;
