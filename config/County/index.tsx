import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  county: string;
  setCounty: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ county, setCounty }) => {
  return (
    <Field>
      <Label>County*</Label>
      <Input
        onChange={(e) => setCounty(e.target.value)}
        type="text"
        value={county}
        required
      />
    </Field>
  );
};

export default Config;
