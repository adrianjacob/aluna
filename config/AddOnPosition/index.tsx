import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addOnPositionTop: boolean;
  addOnPositionRight: boolean;
  addOnPositionLeft: boolean;
  setAddOnPositionTop: React.Dispatch<React.SetStateAction<boolean>>;
  setAddOnPositionRight: React.Dispatch<React.SetStateAction<boolean>>;
  setAddOnPositionLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

const Config: React.FC<Props> = ({
  addOnPositionTop,
  setAddOnPositionTop,
  addOnPositionRight,
  setAddOnPositionRight,
  addOnPositionLeft,
  setAddOnPositionLeft,
}) => {
  return (
    <Field help="Select all that apply">
      <Label>Add-on position*</Label>
      <Field.Options>
        <Option
          isActive={addOnPositionTop}
          onClick={() => setAddOnPositionTop(!addOnPositionTop)}
        >
          Top
        </Option>
        <Option
          isActive={addOnPositionRight}
          onClick={() => setAddOnPositionRight(!addOnPositionRight)}
        >
          Right
        </Option>
        <Option
          isActive={addOnPositionLeft}
          onClick={() => setAddOnPositionLeft(!addOnPositionLeft)}
        >
          Left
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
