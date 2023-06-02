import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  blindsTrack: string;
  setBlindsTrack: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ blindsTrack, setBlindsTrack }) => {
  return (
    <Field help="Best complimentary track colour is preselected when choosing the blinds colour. You can override this.">
      <Label>Track colour*</Label>
      <Field.Options>
        <Option
          isActive={blindsTrack === "S102 White"}
          onClick={() => setBlindsTrack("S102 White")}
        >
          S102 White
        </Option>
        <Option
          isActive={blindsTrack === "S149 Cream"}
          onClick={() => setBlindsTrack("S149 Cream")}
          style={{ background: "#f9f0e5" }}
        >
          S149 Cream
        </Option>
        <Option
          isActive={blindsTrack === "S157 Silver"}
          onClick={() => setBlindsTrack("S157 Silver")}
          style={{ background: "#e0e0e0" }}
        >
          S157 Silver
        </Option>
        <Option
          isActive={blindsTrack === "S159 Anthracite"}
          onClick={() => setBlindsTrack("S159 Anthracite")}
          style={{ background: "#676767", color: "#FFF" }}
        >
          S159 Anthracite
        </Option>
        <Option
          isActive={blindsTrack === "S160 Black"}
          onClick={() => setBlindsTrack("S160 Black")}
          style={{ background: "#0a0a0a", color: "#FFF" }}
        >
          S160 Black
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
