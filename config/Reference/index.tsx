import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  reference: string;
  setReference: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ reference, setReference }) => {
  return (
    <Field>
      <Label>reference*</Label>
      <Input
        autoFocus
        onChange={(e) => setReference(e.target.value)}
        type="text"
        value={reference}
        required
        className="uppercase"
      />
    </Field>
  );
};

export default Config;
