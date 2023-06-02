import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

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
        <Option
          isActive={frameColor === "White (RAL 9016 Gloss)"}
          onClick={() => handleFrameColor("White (RAL 9016 Gloss)", 0)}
        >
          White
          <br />
          (RAL 9016 Gloss)
        </Option>
        <Option
          isActive={frameColor === "Black (RAL 9005 Matt)"}
          onClick={() => handleFrameColor("Black (RAL 9005 Matt)", 0)}
        >
          Black
          <br />
          (RAL 9005 Matt)
        </Option>
        <Option
          isActive={frameColor === "Anthracite (RAL 7016 Matt)"}
          onClick={() => handleFrameColor("Anthracite (RAL 7016 Matt)", 0)}
        >
          Anthracite
          <br />
          (RAL 7016 Matt)
        </Option>
        <Option
          isActive={
            frameColor ===
            "Anthracite external (RAL 7016 Matt) / White internal (RAL 9016 Gloss)"
          }
          onClick={() =>
            handleFrameColor(
              "Anthracite external (RAL 7016 Matt) / White internal (RAL 9016 Gloss)",
              0
            )
          }
        >
          Anthracite external (RAL 7016 Matt) / White internal (RAL 9016 Gloss)
        </Option>
        <Option
          isActive={
            frameColor ===
            "Black external (RAL 9005 Matt) / White internal (RAL 9016 Gloss)"
          }
          onClick={() =>
            handleFrameColor(
              "Black external (RAL 9005 Matt) / White internal (RAL 9016 Gloss)",
              0
            )
          }
        >
          Black external (RAL 9005 Matt) / White internal (RAL 9016 Gloss)
        </Option>
        <Option
          isActive={frameColor === "Single RAL Internal & External"}
          onClick={() =>
            handleFrameColor("Single RAL Internal & External", 17500)
          }
        >
          Single RAL Internal & External
        </Option>
        <Option
          isActive={frameColor === "Dual RAL Internal & External"}
          onClick={() =>
            handleFrameColor("Dual RAL Internal & External", 22500)
          }
        >
          Dual RAL Internal & External
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
