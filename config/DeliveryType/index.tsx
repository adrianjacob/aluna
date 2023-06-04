import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  delivery: string;
  setDelivery: React.Dispatch<React.SetStateAction<string>>;
  setDeliveryCost: React.Dispatch<React.SetStateAction<number>>;
  frameWidth: number;
  frameHeight: number;
}

const Config: React.FC<Props> = ({
  delivery,
  setDelivery,
  setDeliveryCost,
  frameHeight,
  frameWidth,
}) => {
  const handleDelivery = (option: string, cost: number) => {
    setDelivery(option);
    setDeliveryCost(cost);
  };
  return (
    <Field help="Assembled delivery is only available for bifolds up to 4800mm wide x 2200mm high. Please ensure someone is available at the delivery address to assist with offloading and fitting location is accessible for size ordered. Redelivery charges may apply.">
      <Label>Delivery type*</Label>
      <Field.Options>
        {frameWidth <= 4800 && frameHeight <= 2200 && (
          <Option
            isActive={delivery === Object.keys(config.delivery)[0]}
            onClick={() =>
              handleDelivery(
                Object.keys(config.delivery)[0],
                Object.values(config.delivery)[0]
              )
            }
          >
            {Object.keys(config.delivery)[0]}
          </Option>
        )}
        <Option
          isActive={delivery === Object.keys(config.delivery)[1]}
          onClick={() =>
            handleDelivery(
              Object.keys(config.delivery)[1],
              Object.values(config.delivery)[1]
            )
          }
        >
          {Object.keys(config.delivery)[1]}
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
