// @ts-nocheck

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Panel from "../components/Panel";

import config from "../config/index.json";
import Reference from "../config/Reference";
import Name from "../config/Name";
import DeliveryAddress from "../config/DeliveryAddress";
import AddressLine1 from "../config/AddressLine1";
import AddressLine2 from "../config/AddressLine2";
import Town from "../config/Town";
import County from "../config/County";
import Postcode from "../config/Postcode";
import ContactNumber from "../config/ContactNumber";
import Email from "../config/Email";
import FrameWidth from "../config/FrameWidth";
import FrameHeight from "../config/FrameHeight";
import Threshold from "../config/Threshold";
import Cill from "../config/Cill";
import DoorsLeft from "../config/DoorsLeft";
import DoorsRight from "../config/DoorsRight";
import OpeningDirection from "../config/OpeningDirection";
import TrafficDoorSide from "../config/TrafficDoorSide";
import FrameColor from "../config/FrameColor";
import AddOnSize from "../config/AddOnSize";
import AddOnPosition from "../config/AddOnPosition";
import HandleColor from "../config/HandleColor";
import InternalShootbolt from "../config/InternalShootbolt";
import Glazing from "../config/Glazing";
import Blinds from "../config/Blinds";
import BlindsColor from "../config/BlindsColor";
import TrackColor from "../config/TrackColor";
import TrickleVents from "../config/TrickleVents";
import DeliveryType from "../config/DeliveryType";
import Notes from "../config/Notes";

import Field from "../components/Field";
import Label from "../components/Label";
import Button from "../components/Button";
import Banner from "../components/Banner";
import Preview from "../components/Preview";
import Router from "next/router";
import { useSession } from "next-auth/react";

const Draft: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Office");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [county, setCounty] = useState("");
  const [postcode, setPostcode] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [frameWidth, setFrameWidth] = useState(4000);
  const [frameHeight, setFrameHeight] = useState(2200);
  const [threshold, setThreshold] = useState("Standard (55mm)");
  const [cill, setCill] = useState("Standard (150mm)");
  const [cillCost, setCillCost] = useState(1800);
  const [leftDoors, setLeftDoors] = useState(0);
  const [rightDoors, setRightDoors] = useState(0);
  const [openingDirection, setOpeningDirection] = useState("Out");
  const [trafficDoorSide, setTrafficDoorSIde] = useState("Left");
  const [frameColor, setFrameColor] = useState("White (RAL 9016 Gloss)");
  const [frameColorCost, setFrameColorCost] = useState(0);
  const [addOnSize, setAddOnSize] = useState("None");
  const [addOnSizeCost, setAddOnSizeCost] = useState(0);
  const [addOnPositionTop, setAddOnPositionTop] = useState(false);
  const [addOnPositionLeft, setAddOnPositionLeft] = useState(false);
  const [addOnPositionRight, setAddOnPositionRight] = useState(false);
  const [handleColor, setHandleColor] = useState("White");
  const [handleColorCost, setHandleColorCost] = useState(0);
  const [internalShootbolt, setInternalShootbolt] = useState(
    "Standard to match door colour"
  );
  const [internalShootboltCost, setInternalShootboltCost] = useState(0);
  const [glazing, setGlazing] = useState("Unglazed");
  const [glazingCost, setGlazingCost] = useState(0);
  const [blinds, setBlinds] = useState("N/a");
  const [blindsCost, setBlindsCost] = useState(0);
  const [blindsColor, setBlindsColor] = useState("");
  const [blindsTrack, setBlindsTrack] = useState("");
  const [trickleVents, setTrickleVents] = useState("N/a");
  const [trickleVentsCost, setTrickleVentsCost] = useState(0);
  const [delivery, setDelivery] = useState("Assembled");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [content, setContent] = useState("");
  // const frameWidthRef = useRef<HTMLInputElement>(null);
  // const frameHeightRef = useRef<HTMLInputElement>(null);
  // const leftDoorsRef = useRef<HTMLInputElement>(null);
  // const rightDoorsRef = useRef<HTMLInputElement>(null);

  const leaf = {
    min: 550,
    max: 1200,
  };

  const { data: session, status } = useSession();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.currentTarget.form as HTMLFormElement;
    const isValid = form.checkValidity();
    let confirmed = true;
    if (isValid) {
      if (e.currentTarget.name === "order") {
        const confirmed = window.confirm(
          "By clicking 'OK', you’ve checked all the details and are happy to place the order, which will be sent to the office for manufacture. The office will send email confirmation once this is processed."
        );
        if (!confirmed) {
          return;
        }
      }
      if (confirmed) {
        try {
          const body = {
            reference,
            name,
            deliveryOption,
            address1,
            address2,
            town,
            county,
            postcode,
            contact,
            email,
            frameWidth,
            frameHeight,
            threshold,
            cill,
            leftDoors,
            rightDoors,
            openingDirection,
            trafficDoorSide,
            frameColor,
            addOnSize,
            addOnPositionTop,
            addOnPositionLeft,
            addOnPositionRight,
            handleColor,
            internalShootbolt,
            glazing,
            blinds,
            blindsColor,
            blindsTrack,
            trickleVents,
            delivery,
            content,
            published: (e.currentTarget as HTMLButtonElement).name === "order",
            total,
          };
          const response = await fetch("/api/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (response.ok) {
            await Router.push("/");
          } else {
            console.error(
              `Failed to save data: ${response.status} ${response.statusText}`
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      form.reportValidity();
    }
  };

  // MAKE KIT FORM DEFAULT IF LARGER DIMENSIONS
  useEffect(() => {
    if (frameWidth > 4800 || frameHeight > 2200) {
      setDelivery("Kit form");
      setDeliveryCost(7500);
    }
  }, [frameWidth, frameHeight]);

  // SET TOTAL
  useEffect(() => {
    const sumCill = (frameWidth / 1000) * (cillCost / 100);
    const doorsPerLeaf = frameHeight < 2250 ? 395 : 425;
    const sumDoors = doorsPerLeaf * (leftDoors + rightDoors);
    const sumFrameColor = (frameColorCost / 100) * (leftDoors + rightDoors);
    // const sumAddOnSize = (frameWidth / 1000) * (addOnSizeCost / 100);
    const sumAddOnSize = 0;
    const sumAddOnPositionTop = addOnPositionTop
      ? (addOnSizeCost / 100) * (frameWidth / 1000)
      : 0;
    const sumAddOnPositionLeft = addOnPositionLeft
      ? (addOnSizeCost / 100) * (frameHeight / 1000)
      : 0;
    const sumAddOnPositionRight = addOnPositionRight
      ? (addOnSizeCost / 100) * (frameHeight / 1000)
      : 0;
    const sumHandleColour = handleColorCost / 100;
    const sumInternalShootbolt = internalShootboltCost / 100;
    const sumTrickleVents = trickleVentsCost / 100;
    const sumGlazing =
      ((frameWidth * frameHeight) / 1000000) * (glazingCost / 100);
    const sumBlinds = (leftDoors + rightDoors) * (blindsCost / 100);
    const sumDelivery = deliveryCost / 100;
    setTotal(
      sumCill +
        sumDoors +
        sumFrameColor +
        sumAddOnSize +
        sumAddOnPositionTop +
        sumAddOnPositionLeft +
        sumAddOnPositionRight +
        sumHandleColour +
        sumInternalShootbolt +
        sumTrickleVents +
        sumGlazing +
        sumBlinds +
        sumDelivery
    );
  });

  // SET DEFAULT LEFT DOORS
  useEffect(() => {
    setLeftDoors(Math.ceil(frameWidth / leaf.max));
  }, [frameWidth]);

  return (
    <Layout title="New quote">
      <Panel isPadding>
        {!session ? (
          <p>Please log in to view posts</p>
        ) : (
          <>
            <form onSubmit={submitData}>
              <Reference {...{ reference, setReference }} />
              <Name {...{ name, setName }} />
              <DeliveryAddress {...{ deliveryOption, setDeliveryOption }} />
              {deliveryOption === "Custom" && (
                <>
                  <AddressLine1 {...{ address1, setAddress1 }} />
                  <AddressLine2 {...{ address2, setAddress2 }} />
                  <Town {...{ town, setTown }} />
                  <County {...{ county, setCounty }} />
                  <Postcode {...{ postcode, setPostcode }} />
                </>
              )}
              <ContactNumber {...{ contact, setContact }} />
              <Email {...{ email, setEmail }} />
              <FrameWidth {...{ frameWidth, setFrameWidth, leaf }} />
              <FrameHeight {...{ frameHeight, setFrameHeight, leaf }} />
              <Threshold {...{ threshold, setThreshold }} />
              <Cill {...{ cill, setCill, setCillCost }} />
              <DoorsLeft
                {...{
                  leftDoors,
                  setLeftDoors,
                  rightDoors,
                  setRightDoors,
                  frameWidth,
                  leaf,
                }}
              />
              <DoorsRight
                {...{
                  rightDoors,
                  setRightDoors,
                  leftDoors,
                  setLeftDoors,
                  frameWidth,
                  leaf,
                }}
              />
              <OpeningDirection
                {...{ openingDirection, setOpeningDirection }}
              />
              <TrafficDoorSide {...{ trafficDoorSide, setTrafficDoorSIde }} />
              <FrameColor
                {...{ frameColor, setFrameColor, setFrameColorCost }}
              />
              <AddOnSize
                {...{
                  addOnSize,
                  setAddOnSize,
                  setAddOnSizeCost,
                  setAddOnPositionTop,
                  setAddOnPositionRight,
                  setAddOnPositionLeft,
                }}
              />
              {addOnSize !== "None" && (
                <AddOnPosition
                  {...{
                    addOnPositionTop,
                    setAddOnPositionTop,
                    addOnPositionLeft,
                    setAddOnPositionLeft,
                    addOnPositionRight,
                    setAddOnPositionRight,
                  }}
                />
              )}
              <HandleColor
                {...{
                  handleColor,
                  setHandleColor,
                  setHandleColorCost,
                  frameColor,
                }}
              />
              <InternalShootbolt
                {...{
                  internalShootbolt,
                  setInternalShootbolt,
                  setInternalShootboltCost,
                  handleColor,
                  frameColor,
                }}
              />
              <Glazing
                {...{
                  glazing,
                  setGlazing,
                  setGlazingCost,
                  setBlinds,
                  setBlindsCost,
                }}
              />
              <Blinds
                {...{
                  blinds,
                  setBlinds,
                  setBlindsCost,
                  glazing,
                  setBlindsColor,
                  setBlindsTrack,
                }}
              />
              {blinds === "Integrated Blinds 1.2 U-value" && (
                <>
                  <BlindsColor
                    {...{ blindsColor, setBlindsColor, setBlindsTrack }}
                  />
                  <TrackColor {...{ blindsTrack, setBlindsTrack }} />
                </>
              )}
              <TrickleVents
                {...{ trickleVents, setTrickleVents, setTrickleVentsCost }}
              />
              <DeliveryType
                {...{
                  delivery,
                  setDelivery,
                  setDeliveryCost,
                  frameWidth,
                  frameHeight,
                }}
              />
              <Notes {...{ content, setContent }} />
              <Field>
                <Label>Preview</Label>
                <Preview
                  leftDoors={leftDoors}
                  rightDoors={rightDoors}
                  frameColor={frameColor}
                />
              </Field>
              <Banner>
                <Banner.Left>
                  <Button
                    type="submit"
                    variant="secondary"
                    name="save"
                    onClick={submitData}
                  >
                    Save
                  </Button>
                </Banner.Left>
                <Banner.Right>
                  <div>
                    £
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <br />
                    <small>(ex. VAT)</small>
                  </div>
                  <Button type="submit" name="order" onClick={submitData}>
                    Order
                  </Button>
                </Banner.Right>
              </Banner>
            </form>
          </>
        )}
      </Panel>
    </Layout>
  );
};

export default Draft;
