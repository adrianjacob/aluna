import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  town: string;
  setTown: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ town, setTown }) => {
  return (
    <Field>
      <Label>Town*</Label>
      <Input
        onChange={(e) => setTown(e.target.value)}
        type="text"
        value={town}
        required
      />
    </Field>
  );
};

export default Config;
