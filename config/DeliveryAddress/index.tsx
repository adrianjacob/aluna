import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  deliveryOption: string;
  setDeliveryOption: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({ deliveryOption, setDeliveryOption }) => {
  return (
    <Field>
      <Label>Delivery address*</Label>
      <Field.Options>
        <Option
          isActive={deliveryOption === "Office"}
          onClick={() => setDeliveryOption("Office")}
        >
          Office
        </Option>
        <Option
          isActive={deliveryOption === "Custom"}
          onClick={() => setDeliveryOption("Custom")}
        >
          Custom
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
