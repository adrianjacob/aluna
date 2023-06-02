import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ content, setContent }) => {
  return (
    <Field>
      <Label>Notes</Label>
      <Input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        isTextArea={true}
      />
    </Field>
  );
};

export default Config;
