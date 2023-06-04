import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  frameColor: string;
  setFrameColor: React.Dispatch<React.SetStateAction<string>>;
  setFrameColorCost: React.Dispatch<React.SetStateAction<number>>;
}

const Config: React.FC<Props> = ({
  frameColor,
  setFrameColor,
  setFrameColorCost,
}) => {
  const handleFrameColor = (option: string, cost: number) => {
    setFrameColor(option);
    setFrameColorCost(cost);
  };
  return (
    <Field>
      <Label>Frame colour*</Label>
      <Field.Options>
        {Object.keys(config.frameColor).map((key, index) => (
          <Option
            key={index}
            isActive={frameColor === key}
            onClick={() =>
              handleFrameColor(key, Object.values(config.frameColor)[index])
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
