import React from "react";
import Input from "../../components/Input";
import Field from "../../components/Field";
import Label from "../../components/Label";
import Button from "../../components/Button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  leftDoors: number;
  setLeftDoors: React.Dispatch<React.SetStateAction<number>>;
  rightDoors: number;
  setRightDoors: React.Dispatch<React.SetStateAction<number>>;
  frameWidth: number;
  leaf: {
    min: number;
    max: number;
  };
}

const Config: React.FC<Props> = ({
  leftDoors,
  setLeftDoors,
  setRightDoors,
  frameWidth,
  rightDoors,
  leaf,
}) => {
  return (
    <Field
      help={`Viewed from outside. Total doors min = ${Math.ceil(
        frameWidth / leaf.max
      )} and max = ${Math.floor(frameWidth / leaf.min)}. `}
    >
      <Label>Number of left hand doors*</Label>
      <Field.Flex>
        <Button
          type="button"
          onClick={() => {
            if (leftDoors + rightDoors <= Math.ceil(frameWidth / leaf.max)) {
              return false;
            } else if (leftDoors !== 0) {
              setLeftDoors((leftDoors) => {
                return +leftDoors - 1;
              });
            }
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
          type="number"
          readOnly
          step="1"
          value={leftDoors}
          required
          // ref={leftDoorsRef}
          onChange={(e) => {
            setLeftDoors(+e.target.value);
          }}
          className="square"
        />
        <Button
          type="button"
          onClick={() => {
            if (
              leftDoors + rightDoors >= Math.floor(frameWidth / leaf.min) &&
              rightDoors !== 0
            ) {
              setRightDoors((rightDoors) => {
                return +rightDoors - 1;
              });
              setLeftDoors((leftDoors) => {
                return +leftDoors + 1;
              });
            } else if (leftDoors < Math.floor(frameWidth / leaf.min)) {
              setLeftDoors((leftDoors) => {
                return +leftDoors + 1;
              });
            }
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
