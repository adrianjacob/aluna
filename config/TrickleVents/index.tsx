import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trickleVents: string;
  setTrickleVents: React.Dispatch<React.SetStateAction<string>>;
  setTrickleVentsCost: React.Dispatch<React.SetStateAction<number>>;
}

const Config: React.FC<Props> = ({
  trickleVents,
  setTrickleVents,
  setTrickleVentsCost,
}) => {
  const handleTrickleVents = (option: string, cost: number) => {
    setTrickleVents(option);
    setTrickleVentsCost(cost);
  };
  return (
    <Field help="Each trickle vent provides up to 2500mm² of exhaust air">
      <Label>Trickle vents*</Label>
      <Field.Options>
        {Object.entries(config.trickleVents)
          .sort((a, b) => a[1] - b[1])
          .map(([key, value], index) => (
            <Option
              key={index}
              isActive={trickleVents === key}
              onClick={() =>
                handleTrickleVents(
                  key,
                  Object.values(config.trickleVents)[index]
                )
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
