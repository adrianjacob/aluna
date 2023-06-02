import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ name, setName }) => {
  return (
    <Field>
      <Label>name*</Label>
      <Input
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
        required
      />
    </Field>
  );
};

export default Config;
