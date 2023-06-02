import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  openingDirection: string;
  setOpeningDirection: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ openingDirection, setOpeningDirection }) => {
  return (
    <Field help="Viewed from outside">
      <Label>Opening direction*</Label>
      <Field.Options>
        <Option
          isActive={openingDirection === "Out"}
          onClick={() => setOpeningDirection("Out")}
        >
          Out
        </Option>
        <Option
          isActive={openingDirection === "In"}
          onClick={() => {
            const confirmed = window.confirm(
              "Note: Not a popular option and the doors could clash with internal furniture."
            );
            if (confirmed) {
              setOpeningDirection("In");
            }
          }}
        >
          In
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
