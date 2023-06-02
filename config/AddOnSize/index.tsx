import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addOnSize: string;
  setAddOnSize: React.Dispatch<React.SetStateAction<string>>;
  setAddOnSizeCost: React.Dispatch<React.SetStateAction<number>>;
  setAddOnPositionTop: React.Dispatch<React.SetStateAction<boolean>>;
  setAddOnPositionRight: React.Dispatch<React.SetStateAction<boolean>>;
  setAddOnPositionLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

const Config: React.FC<Props> = ({
  addOnSize,
  setAddOnSize,
  setAddOnSizeCost,
  setAddOnPositionTop,
  setAddOnPositionRight,
  setAddOnPositionLeft,
}) => {
  const handleAddOnSize = (option: string, cost: number) => {
    setAddOnSize(option);
    setAddOnSizeCost(cost);
  };
  return (
    <Field help="Included in the overall size of the bifold">
      <Label>Add-on size*</Label>
      <Field.Options>
        <Option
          isActive={addOnSize === "None"}
          onClick={() => {
            handleAddOnSize("None", 0);
            setAddOnPositionTop(false);
            setAddOnPositionRight(false);
            setAddOnPositionLeft(false);
          }}
        >
          None
        </Option>
        <Option
          isActive={addOnSize === "20mm add-on"}
          onClick={() => handleAddOnSize("20mm add-on", 1650)}
        >
          20mm add-on
        </Option>
        <Option
          isActive={addOnSize === "38mm add-on"}
          onClick={() => handleAddOnSize("38mm add-on", 1850)}
        >
          38mm add-on
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
