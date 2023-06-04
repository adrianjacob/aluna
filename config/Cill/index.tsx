import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

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
        {Object.keys(config.cill).map((key, index) => (
          <Option
            key={index}
            isActive={cill === key}
            onClick={() =>
              handleCillSelect(key, Object.values(config.cill)[index])
            }
          >
            {key}
          </Option>
        ))}
      </Field.Options>
    </Field>
  );
};

export default Config;
