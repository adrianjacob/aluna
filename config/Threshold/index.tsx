import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  threshold: string;
  setThreshold: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ threshold, setThreshold }) => {
  return (
    <Field>
      <Label>Threshold*</Label>
      <Field.Options>
        <Option
          isActive={threshold === "Standard (55mm)"}
          onClick={() => setThreshold("Standard (55mm)")}
        >
          Standard
          <br />
          (55mm)
        </Option>
        <Option
          isActive={threshold === "Low (20mm)"}
          onClick={() => setThreshold("Low (20mm)")}
        >
          Low
          <br />
          (20mm)
        </Option>
        <Option
          isActive={threshold === "Low w/rebate (40mm)"}
          onClick={() => setThreshold("Low w/rebate (40mm)")}
        >
          Low w/rebate
          <br />
          (40mm)
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
