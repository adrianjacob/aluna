import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  cill: string;
  setCill: React.Dispatch<React.SetStateAction<string>>;
  setCillCost: React.Dispatch<React.SetStateAction<number>>;
}

const Config: React.FC<Props> = ({ cill, setCill, setCillCost }) => {
  const handleCillSelect = (option: string, cost: number) => {
    setCill(option);
    setCillCost(cost);
  };
  return (
    <Field>
      <Label>Cill*</Label>
      <Field.Options>
        <Option
          isActive={cill === "Standard (150mm)"}
          onClick={() => handleCillSelect("Standard (150mm)", 1800)}
        >
          Standard
          <br />
          (150mm)
        </Option>
        <Option
          isActive={cill === "None"}
          onClick={() => handleCillSelect("None", 0)}
        >
          None
        </Option>
        <Option
          isActive={cill === "90mm"}
          onClick={() => handleCillSelect("90mm", 1650)}
        >
          90mm
        </Option>
        <Option
          isActive={cill === "190mm"}
          onClick={() => handleCillSelect("190mm", 2100)}
        >
          190mm
        </Option>
        <Option
          isActive={cill === "230mm"}
          onClick={() => handleCillSelect("230mm", 2500)}
        >
          230mm
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
