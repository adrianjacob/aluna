import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";
import Button from "../../components/Button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  frameHeight: number;
  setFrameHeight: React.Dispatch<React.SetStateAction<number>>;
  leaf: {
    min: number;
    max: number;
  };
}

const Config: React.FC<Props> = ({ frameHeight, setFrameHeight, leaf }) => {
  return (
    <Field help="Max 2500mm - higher sizes available upon request">
      <Label>Overall Frame Height (MM)*</Label>
      <Field.Flex>
        <Button
          type="button"
          onClick={() => {
            setFrameHeight((frameHeight) => +frameHeight - 5);
            // frameHeightRef.current?.focus();
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1 1h10"
            />
          </svg>
        </Button>
        <Input
          onChange={(e) => setFrameHeight(+e.target.value)}
          type="number"
          step="5"
          value={frameHeight}
          pattern="[0-9]*"
          required
          // ref={frameHeightRef}
          className="square"
          min="0"
          max="2500"
        />
        <Button
          type="button"
          onClick={() => {
            setFrameHeight((frameHeight) => Math.min(+frameHeight + 5, 2500));
            // frameHeightRef.current?.focus();
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1 9h16M9 1v16"
            />
          </svg>
        </Button>
      </Field.Flex>
    </Field>
  );
};

export default Config;
