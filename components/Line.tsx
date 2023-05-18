import classNames from "classnames/bind";
import styles from "./Line.module.scss";

const cx = classNames.bind(styles);

interface LineProps {
  children: React.ReactNode;
  help?: string;
}

interface LineKeyProps {
  children: React.ReactNode;
}

interface LineValueProps {
  children: React.ReactNode;
}

const Line: React.FC<LineProps> & {
  Key: React.FC<LineKeyProps>;
  Value: React.FC<LineValueProps>;
} = ({ children, help }) => {
  return <div className={cx("line")}>{children}</div>;
};

const LineKey: React.FC<LineKeyProps> = ({ children }) => {
  return <div className={cx("key")}>{children}</div>;
};

const LineValue: React.FC<LineValueProps> = ({ children }) => {
  return <div className={cx("value")}>{children}</div>;
};

Line.Key = LineKey;
Line.Value = LineValue;

export default Line;
