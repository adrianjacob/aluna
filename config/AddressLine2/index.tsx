import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  address2: string;
  setAddress2: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ address2, setAddress2 }) => {
  return (
    <Field>
      <Label>Address line 2</Label>
      <Input
        onChange={(e) => setAddress2(e.target.value)}
        type="text"
        value={address2}
      />
    </Field>
  );
};

export default Config;
