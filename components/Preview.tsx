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
  const leftDoorsArray = [];
  for (let i = 0; i < leftDoors; i++) {
    leftDoorsArray.push(
      <Door pos="L" key={`left-${i}`} frameColor={frameColor} />
    );
  }

  const rightDoorsArray = [];
  for (let i = 0; i < rightDoors; i++) {
    rightDoorsArray.push(
      <Door pos="R" key={`right-${i}`} frameColor={frameColor} />
    );
  }
  return (
    <>
      <div className={cx("preview")}>
        {leftDoorsArray}
        {rightDoorsArray}
      </div>
      <div className={cx("help")}>Viewed from the outside</div>
    </>
  );
};

export default Preview;
