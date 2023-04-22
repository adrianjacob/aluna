import classNames from "classnames/bind";
import styles from "./Field.module.scss";

const cx = classNames.bind(styles);

interface FieldProps {
  children: React.ReactNode;
  help?: string;
}

interface FieldFlexProps {
  children: React.ReactNode;
}

interface FieldOptionsProps {
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> & {
  Flex: React.FC<FieldFlexProps>;
  Options: React.FC<FieldOptionsProps>;
} = ({ children, help }) => {
  return (
    <div className={cx("field")}>
      {children}
      {help && <div className={cx("help")}>{help}</div>}
    </div>
  );
};

const FieldFlex: React.FC<FieldFlexProps> = ({ children }) => {
  return <div className={cx("step")}>{children}</div>;
};

const FieldOptions: React.FC<FieldOptionsProps> = ({ children }) => {
  return <div className={cx("overflow")}>{children}</div>;
};

Field.Flex = FieldFlex;
Field.Options = FieldOptions;

export default Field;
