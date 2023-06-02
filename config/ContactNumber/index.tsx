import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  contact: string;
  setContact: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ contact, setContact }) => {
  return (
    <Field>
      <Label>Contact number*</Label>
      <Input
        onChange={(e) => setContact(e.target.value)}
        type="number"
        value={contact}
        required
      />
    </Field>
  );
};

export default Config;
