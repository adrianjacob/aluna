import React from "react";
import Option from "../../components/Option";
import Field from "../../components/Field";
import Label from "../../components/Label";
import config from "../index.json";

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
          isActive={blindsColor === Object.keys(config.blindsColor)[0]}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[0]);
            setBlindsTrack(Object.keys(config.blindsColor)[0]);
          }}
        >
          {Object.keys(config.blindsColor)[0]}
        </Option>
        <Option
          isActive={blindsColor === Object.keys(config.blindsColor)[1]}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[1]);
            setBlindsTrack(Object.keys(config.blindsColor)[9]);
          }}
          style={{ background: "#f9e7a7" }}
        >
          {Object.keys(config.blindsColor)[1]}
        </Option>
        <Option
          isActive={blindsColor === "S125 Beige"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[2]);
            setBlindsTrack(Object.keys(config.blindsColor)[6]);
          }}
          style={{ background: "#efdcd1" }}
        >
          {Object.keys(config.blindsColor)[2]}
        </Option>
        <Option
          isActive={blindsColor === "S130 Green"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[3]);
            setBlindsTrack(Object.keys(config.blindsColor)[8]);
          }}
          style={{ background: "#c9dfd2" }}
        >
          {Object.keys(config.blindsColor)[3]}
        </Option>
        <Option
          isActive={blindsColor === "S142 Light Blue"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[4]);
            setBlindsTrack(Object.keys(config.blindsColor)[8]);
          }}
          style={{ background: "#d5edf7" }}
        >
          {Object.keys(config.blindsColor)[4]}
        </Option>
        <Option
          isActive={blindsColor === "S149 Cream"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[5]);
            setBlindsTrack(Object.keys(config.blindsColor)[5]);
          }}
          style={{ background: "#f9f0e5" }}
        >
          {Object.keys(config.blindsColor)[5]}
        </Option>
        <Option
          isActive={blindsColor === "S155 Grey"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[6]);
            setBlindsTrack(Object.keys(config.blindsColor)[8]);
          }}
          style={{ background: "#ebebeb" }}
        >
          {Object.keys(config.blindsColor)[6]}
        </Option>
        <Option
          isActive={blindsColor === "S156 Metallic Grey"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[7]);
            setBlindsTrack(Object.keys(config.blindsColor)[8]);
          }}
          style={{ background: "#bdbdbd" }}
        >
          {Object.keys(config.blindsColor)[7]}
        </Option>
        <Option
          isActive={blindsColor === "S157 Silver"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[8]);
            setBlindsTrack(Object.keys(config.blindsColor)[8]);
          }}
          style={{ background: "#e0e0e0" }}
        >
          {Object.keys(config.blindsColor)[8]}
        </Option>
        <Option
          isActive={blindsColor === "S159 Anthracite"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[9]);
            setBlindsTrack(Object.keys(config.blindsColor)[9]);
          }}
          style={{ background: "#676767", color: "#FFF" }}
        >
          {Object.keys(config.blindsColor)[9]}
        </Option>
        <Option
          isActive={blindsColor === "S160 Black"}
          onClick={() => {
            setBlindsColor(Object.keys(config.blindsColor)[10]);
            setBlindsTrack(Object.keys(config.blindsColor)[10]);
          }}
          style={{ background: "#0a0a0a", color: "#FFF" }}
        >
          {Object.keys(config.blindsColor)[10]}
        </Option>
      </Field.Options>
    </Field>
  );
};

export default Config;
