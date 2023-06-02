import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";
import Button from "../../components/Button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  frameWidth: string;
  setFrameWidth: React.Dispatch<React.SetStateAction<number>>;
  leaf: {
    min: number;
    max: number;
  };
}

const Config: React.FC<Props> = ({ frameWidth, setFrameWidth, leaf }) => {
  return (
    <Field help={`Min ${leaf.min}mm - Max ${leaf.max}mm sash width`}>
      <Label>Overall Frame Width (MM)*</Label>
      <Field.Flex>
        <Button
          type="button"
          onClick={() => {
            setFrameWidth((frameWidth) => +frameWidth - 5);
            // frameWidthRef.current?.focus();
          }}
          tabIndex={-1}
          className="decrement"
          variant="tertiary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="2"
            fill="none"
          >
            <path
              stroke="#001A72"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M1 1h10"
            />
          </svg>
        </Button>
        <Input
          onChange={(e) => setFrameWidth(+e.target.value)}
          type="number"
          step="5"
          value={frameWidth}
          pattern="[0-9]*"
          required
          // ref={frameWidthRef}
          className="square"
          min="0"
        />
        <Button
          type="button"
          onClick={() => {
            setFrameWidth((frameWidth) => +frameWidth + 5);
            // frameWidthRef.current?.focus();
          }}
          tabIndex={-1}
          className="increment"
          variant="tertiary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
          >
            <path
              stroke="#001A72"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M1 9h16M9 1v16"
            />
          </svg>
        </Button>
        {/* PERHAPS ADD OPTION +100 */}
      </Field.Flex>
    </Field>
  );
};

export default Config;
