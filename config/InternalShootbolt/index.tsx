import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  internalShootbolt: string;
  setInternalShootbolt: React.Dispatch<React.SetStateAction<string>>;
  setInternalShootboltCost: React.Dispatch<React.SetStateAction<number>>;
  handleColor: string;
  frameColor: string;
}

const Config: React.FC<Props> = ({
  internalShootbolt,
  setInternalShootbolt,
  setInternalShootboltCost,
  handleColor,
  frameColor,
}) => {
  const handleInternalShootbolt = (option: string, cost: number) => {
    setInternalShootbolt(option);
    setInternalShootboltCost(cost);
  };
  return (
    <Field>
      <Label>Internal shootbolt handle colour*</Label>
      <Field.Options>
        <Option
          isActive={internalShootbolt === "Standard to match door colour"}
          onClick={() =>
            handleInternalShootbolt("Standard to match door colour", 0)
          }
        >
          Standard to match door colour
        </Option>
        {handleColor !== "Black" && (
          <Option
            isActive={internalShootbolt === "Black"}
            onClick={() => handleInternalShootbolt("Black", 0)}
          >
            Black
          </Option>
        )}

        {(frameColor === "Single RAL Internal & External" ||
          frameColor === "Dual RAL Internal & External") && (
          <>
            <Option
              isActive={internalShootbolt === "Chrome"}
              onClick={() => handleInternalShootbolt("Chrome", 1000)}
            >
              Chrome
            </Option>
            <Option
              isActive={internalShootbolt === "Satin Brushed Aluminium"}
              onClick={() =>
                handleInternalShootbolt("Satin Brushed Aluminium", 1000)
              }
            >
              Satin Brushed Aluminium
            </Option>
          </>
        )}
      </Field.Options>
    </Field>
  );
};

export default Config;
