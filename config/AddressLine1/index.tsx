import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  address1: string;
  setAddress1: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ address1, setAddress1 }) => {
  return (
    <Field>
      <Label>Address line 1*</Label>
      <Input
        onChange={(e) => setAddress1(e.target.value)}
        type="text"
        value={address1}
        required
      />
    </Field>
  );
};

export default Config;
