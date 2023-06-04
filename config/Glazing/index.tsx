import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

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
          isActive={glazing === Object.keys(config.glazing)[0]}
          onClick={() => {
            handleGlazing(
              Object.keys(config.glazing)[0],
              Object.values(config.glazing)[0]
            );
            handleBlinds(
              Object.keys(config.blinds)[0],
              Object.values(config.blinds)[0]
            );
          }}
        >
          {Object.keys(config.glazing)[0]}
        </Option>
        <Option
          isActive={glazing === Object.keys(config.glazing)[1]}
          onClick={() =>
            handleGlazing(
              Object.keys(config.glazing)[1],
              Object.values(config.glazing)[1]
            )
          }
        >
          {Object.keys(config.glazing)[1]}
        </Option>
        <Option
          isActive={glazing === Object.keys(config.glazing)[2]}
          onClick={() => {
            handleGlazing(
              Object.keys(config.glazing)[2],
              Object.values(config.glazing)[2]
            );
            handleBlinds(
              Object.keys(config.blinds)[0],
              Object.values(config.blinds)[0]
            );
          }}
        >
          {Object.keys(config.glazing)[2]}
        </Option>
        <Option
          isActive={glazing === Object.keys(config.glazing)[3]}
          onClick={() => {
            handleGlazing(
              Object.keys(config.glazing)[3],
              Object.values(config.glazing)[3]
            );
            handleBlinds(
              Object.keys(config.blinds)[0],
              Object.values(config.blinds)[0]
            );
          }}
        >
          {Object.keys(config.glazing)[3]}
        </Option>
        <Option
          isActive={glazing === Object.keys(config.glazing)[4]}
          onClick={() => {
            handleGlazing(
              Object.keys(config.glazing)[4],
              Object.values(config.glazing)[4]
            );
            handleBlinds(
              Object.keys(config.blinds)[0],
              Object.values(config.blinds)[0]
            );
          }}
        >
          {Object.keys(config.glazing)[4]}
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
