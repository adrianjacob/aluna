import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleColor: string;
  setHandleColor: React.Dispatch<React.SetStateAction<string>>;
  setHandleColorCost: React.Dispatch<React.SetStateAction<number>>;
  frameColor: string;
}

const Config: React.FC<Props> = ({
  handleColor,
  setHandleColor,
  setHandleColorCost,
  frameColor,
}) => {
  const handleHandleColor = (option: string, cost: number) => {
    setHandleColor(option);
    setHandleColorCost(cost);
  };
  return (
    <Field>
      <Label>Handle colour*</Label>
      <Field.Options>
        <Option
          isActive={handleColor === "White"}
          onClick={() => handleHandleColor("White", 0)}
        >
          White
        </Option>
        <Option
          isActive={handleColor === "Black"}
          onClick={() => handleHandleColor("Black", 0)}
        >
          Black
        </Option>
        <Option
          isActive={handleColor === "Anthracite"}
          onClick={() => handleHandleColor("Anthracite", 0)}
        >
          Anthracite
        </Option>
        <Option
          isActive={handleColor === "Chrome"}
          onClick={() => handleHandleColor("Chrome", 1000)}
        >
          Chrome
        </Option>
        <Option
          isActive={handleColor === "Satin Brushed Aluminium"}
          onClick={() => handleHandleColor("Satin Brushed Aluminium", 1000)}
        >
          Satin Brushed Aluminium
        </Option>
        {(frameColor === "White (RAL 9016 Gloss)" ||
          frameColor === "Black (RAL 9005 Matt)" ||
          frameColor === "Anthracite (RAL 7016 Matt)") && (
          <Option
            isActive={handleColor === "Dual-Colour to match"}
            onClick={() => handleHandleColor("Dual-Colour to match", 2000)}
          >
            Dual-Colour to match
          </Option>
        )}
      </Field.Options>
    </Field>
  );
};

export default Config;
