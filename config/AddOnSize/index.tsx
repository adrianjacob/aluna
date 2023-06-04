import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

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
        {Object.keys(config.addOnSize).map((key, index) => (
          <Option
            key={index}
            isActive={addOnSize === key}
            onClick={() => {
              handleAddOnSize(key, Object.values(config.addOnSize)[index]);
              if (index === 0) {
                setAddOnPositionTop(false);
                setAddOnPositionRight(false);
                setAddOnPositionLeft(false);
              }
            }}
          >
            {key}
          </Option>
        ))}
      </Field.Options>
    </Field>
  );
};

export default Config;
