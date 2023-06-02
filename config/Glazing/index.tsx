import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glazing: string;
  setGlazing: React.Dispatch<React.SetStateAction<string>>;
  setGlazingCost: React.Dispatch<React.SetStateAction<number>>;
  setBlinds: React.Dispatch<React.SetStateAction<string>>;
  setBlindsCost: React.Dispatch<React.SetStateAction<number>>;
}

const Config: React.FC<Props> = ({
  glazing,
  setGlazing,
  setGlazingCost,
  setBlinds,
  setBlindsCost,
}) => {
  const handleGlazing = (option: string, cost: number) => {
    setGlazing(option);
    setGlazingCost(cost);
  };
  const handleBlinds = (option: string, cost: number) => {
    setBlinds(option);
    setBlindsCost(cost);
  };
  return (
    <Field help="28mm double glazing units">
      <Label>Glazing*</Label>
      <Field.Options>
        <Option
          isActive={glazing === "Unglazed"}
          onClick={() => {
            handleGlazing("Unglazed", 0);
            handleBlinds("N/a", 0);
          }}
        >
          Unglazed
        </Option>
        <Option
          isActive={glazing === "Clear Low E 1.2 U-value"}
          onClick={() => handleGlazing("Clear Low E 1.2 U-value", 4900)}
        >
          Clear Low E 1.2 U-value
        </Option>
        <Option
          isActive={glazing === "Clear Ultra Low E 1.1 U-value"}
          onClick={() => {
            handleGlazing("Clear Ultra Low E 1.1 U-value", 5600);
            handleBlinds("N/a", 0);
          }}
        >
          Clear Ultra Low E 1.1 U-value
        </Option>
        <Option
          isActive={
            glazing ===
            "Clear Ultra Low E 1.1 U-value PAS-24 6.8mm Laminated 4mm Unit"
          }
          onClick={() => {
            handleGlazing(
              "Clear Ultra Low E 1.1 U-value PAS-24 6.8mm Laminated 4mm Unit",
              8100
            );
            handleBlinds("N/a", 0);
          }}
        >
          Clear Ultra Low E 1.1 U-value PAS-24 6.8mm Laminated 4mm Unit
        </Option>
        <Option
          isActive={glazing === "Other"}
          onClick={() => {
            handleGlazing("Other", 0);
            handleBlinds("N/a", 0);
          }}
        >
          Other (POA)
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
