import classNames from "classnames/bind";
import styles from "./Banner.module.scss";

const cx = classNames.bind(styles);

interface FieldProps {
  children: React.ReactNode;
  help?: string;
}

interface BannerLeftProps {
  children: React.ReactNode;
}

interface BannerRightProps {
  children: React.ReactNode;
}

const Banner: React.FC<FieldProps> & {
  Left: React.FC<BannerLeftProps>;
  Right: React.FC<BannerRightProps>;
} = ({ children }) => {
  return <div className={cx("banner")}>{children}</div>;
};

const BannerLeft: React.FC<BannerLeftProps> = ({ children }) => {
  return <div className={cx("left")}>{children}</div>;
};

const BannerRight: React.FC<BannerRightProps> = ({ children }) => {
  return <div className={cx("right")}>{children}</div>;
};

Banner.Left = BannerLeft;
Banner.Right = BannerRight;

export default Banner;
