import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

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
          isActive={
            internalShootbolt === Object.keys(config.internalShootbolt)[0]
          }
          onClick={() =>
            handleInternalShootbolt(
              Object.keys(config.internalShootbolt)[0],
              Object.values(config.internalShootbolt)[0]
            )
          }
        >
          {Object.keys(config.internalShootbolt)[0]}
        </Option>
        {handleColor !== Object.keys(config.handleColor)[1] && (
          <Option
            isActive={
              internalShootbolt === Object.keys(config.internalShootbolt)[1]
            }
            onClick={() =>
              handleInternalShootbolt(
                Object.keys(config.internalShootbolt)[1],
                Object.values(config.internalShootbolt)[1]
              )
            }
          >
            {Object.keys(config.internalShootbolt)[1]}
          </Option>
        )}

        {(frameColor === Object.keys(config.frameColor)[5] ||
          frameColor === Object.keys(config.frameColor)[6]) && (
          <>
            <Option
              isActive={
                internalShootbolt === Object.keys(config.internalShootbolt)[2]
              }
              onClick={() =>
                handleInternalShootbolt(
                  Object.keys(config.internalShootbolt)[2],
                  Object.values(config.internalShootbolt)[2]
                )
              }
            >
              {Object.keys(config.internalShootbolt)[2]}
            </Option>
            <Option
              isActive={
                internalShootbolt === Object.keys(config.internalShootbolt)[3]
              }
              onClick={() =>
                handleInternalShootbolt(
                  Object.keys(config.internalShootbolt)[3],
                  Object.values(config.internalShootbolt)[3]
                )
              }
            >
              {Object.keys(config.internalShootbolt)[3]}
            </Option>
          </>
        )}
      </Field.Options>
    </Field>
  );
};

export default Config;
