import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ email, setEmail }) => {
  return (
    <Field>
      <Label>email*</Label>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        value={email}
        required
      />
    </Field>
  );
};

export default Config;
