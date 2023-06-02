import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trafficDoorSide: string;
  setTrafficDoorSIde: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ trafficDoorSide, setTrafficDoorSIde }) => {
  return (
    <Field help="Viewed from outside">
      <Label>Master / traffic door side*</Label>
      <Field.Options>
        <Option
          isActive={trafficDoorSide === "Left"}
          onClick={() => setTrafficDoorSIde("Left")}
        >
          Left
        </Option>
        <Option
          isActive={trafficDoorSide === "Right"}
          onClick={() => setTrafficDoorSIde("Right")}
        >
          Right
        </Option>
        <Option
          isActive={trafficDoorSide === "N/A"}
          onClick={() => setTrafficDoorSIde("N/A")}
        >
          N/A
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
