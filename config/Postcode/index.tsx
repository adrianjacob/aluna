import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  postcode: string;
  setPostcode: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ postcode, setPostcode }) => {
  return (
    <Field>
      <Label>Postcode*</Label>
      <Input
        onChange={(e) => setPostcode(e.target.value)}
        type="text"
        value={postcode}
        pattern="^[A-z]{1,2}[0-9]{1,2}[A-z]{0,1}\s{0,1}[0-9]{1}[A-z]{2}$"
        required
        className="small"
      />
    </Field>
  );
};

export default Config;
