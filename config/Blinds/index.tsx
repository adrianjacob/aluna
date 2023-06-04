import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  blinds: string;
  glazing: string;
  setBlinds: React.Dispatch<React.SetStateAction<string>>;
  setBlindsCost: React.Dispatch<React.SetStateAction<number>>;
  setBlindsColor: React.Dispatch<React.SetStateAction<string>>;
  setBlindsTrack: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({
  blinds,
  glazing,
  setBlinds,
  setBlindsCost,
  setBlindsColor,
  setBlindsTrack,
}) => {
  const handleBlinds = (option: string, cost: number) => {
    setBlinds(option);
    setBlindsCost(cost);
  };
  return (
    <Field help="Max 2300mm high and Max 2sqm per panel. Only available with clear Low E glazing. Magnet handing assumed opposite lever handle unless otherwise stated in notes below, inside view looking out.">
      <Label>Blinds*</Label>
      <Field.Options>
        <Option
          isActive={blinds === Object.keys(config.blinds)[0]}
          onClick={() => {
            handleBlinds(
              Object.keys(config.blinds)[0],
              Object.values(config.blinds)[0]
            );
            setBlindsColor("");
            setBlindsTrack("");
          }}
        >
          {Object.keys(config.blinds)[0]}
        </Option>
        {glazing === "Clear Low E 1.2 U-value" && (
          <Option
            isActive={blinds === Object.keys(config.blinds)[1]}
            onClick={() => {
              handleBlinds(
                Object.keys(config.blinds)[1],
                Object.values(config.blinds)[1]
              );
              setBlindsColor("S102 White");
              setBlindsTrack("S102 White");
            }}
          >
            {Object.keys(config.blinds)[1]}
          </Option>
        )}
      </Field.Options>
    </Field>
  );
};

export default Config;
