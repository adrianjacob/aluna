import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

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
        <Option
          isActive={trickleVents === "N/a"}
          onClick={() => handleTrickleVents("N/a", 0)}
        >
          N/a
        </Option>
        <Option
          isActive={trickleVents === "1"}
          onClick={() => handleTrickleVents("1", 3750)}
        >
          1
        </Option>
        <Option
          isActive={trickleVents === "2"}
          onClick={() => handleTrickleVents("2", 7500)}
        >
          2
        </Option>
        <Option
          isActive={trickleVents === "3"}
          onClick={() => handleTrickleVents("3", 11250)}
        >
          3
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
