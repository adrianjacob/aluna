import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

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
          isActive={handleColor === Object.keys(config.handleColor)[0]}
          onClick={() =>
            handleHandleColor(
              Object.keys(config.handleColor)[0],
              Object.values(config.handleColor)[0]
            )
          }
        >
          {Object.keys(config.handleColor)[0]}
        </Option>
        <Option
          isActive={handleColor === Object.keys(config.handleColor)[1]}
          onClick={() =>
            handleHandleColor(
              Object.keys(config.handleColor)[1],
              Object.values(config.handleColor)[1]
            )
          }
        >
          {Object.keys(config.handleColor)[1]}
        </Option>
        <Option
          isActive={handleColor === Object.keys(config.handleColor)[2]}
          onClick={() =>
            handleHandleColor(
              Object.keys(config.handleColor)[2],
              Object.values(config.handleColor)[2]
            )
          }
        >
          {Object.keys(config.handleColor)[2]}
        </Option>
        <Option
          isActive={handleColor === Object.keys(config.handleColor)[3]}
          onClick={() =>
            handleHandleColor(
              Object.keys(config.handleColor)[3],
              Object.values(config.handleColor)[3]
            )
          }
        >
          {Object.keys(config.handleColor)[3]}
        </Option>
        <Option
          isActive={handleColor === Object.keys(config.handleColor)[4]}
          onClick={() =>
            handleHandleColor(
              Object.keys(config.handleColor)[4],
              Object.values(config.handleColor)[4]
            )
          }
        >
          {Object.keys(config.handleColor)[4]}
        </Option>
        {(frameColor === "White (RAL 9016 Gloss)" ||
          frameColor === "Black (RAL 9005 Matt)" ||
          frameColor === "Anthracite (RAL 7016 Matt)") && (
          <Option
            isActive={handleColor === Object.keys(config.handleColor)[5]}
            onClick={() =>
              handleHandleColor(
                Object.keys(config.handleColor)[5],
                Object.values(config.handleColor)[5]
              )
            }
          >
            {Object.keys(config.handleColor)[5]}
          </Option>
        )}
      </Field.Options>
    </Field>
  );
};

export default Config;
