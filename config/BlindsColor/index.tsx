import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  blindsColor: string;
  setBlindsColor: React.Dispatch<React.SetStateAction<string>>;
  setBlindsTrack: React.Dispatch<React.SetStateAction<string>>;
}

const Config: React.FC<Props> = ({
  blindsColor,
  setBlindsColor,
  setBlindsTrack,
}) => {
  return (
    <Field>
      <Label>Blinds colour*</Label>
      <Field.Options>
        <Option
          isActive={blindsColor === "S102 White"}
          onClick={() => {
            setBlindsColor("S102 White");
            setBlindsTrack("S102 White");
          }}
        >
          S102 White
        </Option>
        <Option
          isActive={blindsColor === "S106 Yellow"}
          onClick={() => {
            setBlindsColor("S106 Yellow");
            setBlindsTrack("S157 Silver");
          }}
          style={{ background: "#f9e7a7" }}
        >
          S106 Yellow
        </Option>
        <Option
          isActive={blindsColor === "S125 Beige"}
          onClick={() => {
            setBlindsColor("S125 Beige");
            setBlindsTrack("S149 Cream");
          }}
          style={{ background: "#efdcd1" }}
        >
          S125 Beige
        </Option>
        <Option
          isActive={blindsColor === "S130 Green"}
          onClick={() => {
            setBlindsColor("S130 Green");
            setBlindsTrack("S157 Silver");
          }}
          style={{ background: "#c9dfd2" }}
        >
          S130 Green
        </Option>
        <Option
          isActive={blindsColor === "S142 Light Blue"}
          onClick={() => {
            setBlindsColor("S142 Light Blue");
            setBlindsTrack("S157 Silver");
          }}
          style={{ background: "#d5edf7" }}
        >
          S142 Light Blue
        </Option>
        <Option
          isActive={blindsColor === "S149 Cream"}
          onClick={() => {
            setBlindsColor("S149 Cream");
            setBlindsTrack("S149 Cream");
          }}
          style={{ background: "#f9f0e5" }}
        >
          S149 Cream
        </Option>
        <Option
          isActive={blindsColor === "S155 Grey"}
          onClick={() => {
            setBlindsColor("S155 Grey");
            setBlindsTrack("S157 Silver");
          }}
          style={{ background: "#ebebeb" }}
        >
          S155 Grey
        </Option>
        <Option
          isActive={blindsColor === "S156 Metallic Grey"}
          onClick={() => {
            setBlindsColor("S156 Metallic Grey");
            setBlindsTrack("S157 Silver");
          }}
          style={{ background: "#bdbdbd" }}
        >
          S156 Metallic Grey
        </Option>
        <Option
          isActive={blindsColor === "S157 Silver"}
          onClick={() => {
            setBlindsColor("S157 Silver");
            setBlindsTrack("S157 Silver");
          }}
          style={{ background: "#e0e0e0" }}
        >
          S157 Silver
        </Option>
        <Option
          isActive={blindsColor === "S159 Anthracite"}
          onClick={() => {
            setBlindsColor("S159 Anthracite");
            setBlindsTrack("S159 Anthracite");
          }}
          style={{ background: "#676767", color: "#FFF" }}
        >
          S159 Anthracite
        </Option>
        <Option
          isActive={blindsColor === "S160 Black"}
          onClick={() => {
            setBlindsColor("S160 Black");
            setBlindsTrack("S160 Black");
          }}
          style={{ background: "#0a0a0a", color: "#FFF" }}
        >
          S160 Black
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
