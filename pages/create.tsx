// @ts-nocheck

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Panel from "../components/Panel";

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

import Input from "../components/Input";
import Field from "../components/Field";
import Label from "../components/Label";
import Option from "../components/Option";
import Modal from "../components/Modal";
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
  const frameWidthRef = useRef<HTMLInputElement>(null);
  const frameHeightRef = useRef<HTMLInputElement>(null);
  const leftDoorsRef = useRef<HTMLInputElement>(null);
  const rightDoorsRef = useRef<HTMLInputElement>(null);

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

  const handleFrameColor = (option: string, cost: number) => {
    setFrameColor(option);
    setFrameColorCost(cost);
  };

  const handleAddOnSize = (option: string, cost: number) => {
    setAddOnSize(option);
    setAddOnSizeCost(cost);
  };

  const handleHandleColour = (option: string, cost: number) => {
    setHandleColor(option);
    setHandleColorCost(cost);
  };

  const handleInternalShootbolt = (option: string, cost: number) => {
    setInternalShootbolt(option);
    setInternalShootboltCost(cost);
  };

  const handleGlazing = (option: string, cost: number) => {
    setGlazing(option);
    setGlazingCost(cost);
  };

  const handleBlinds = (option: string, cost: number) => {
    setBlinds(option);
    setBlindsCost(cost);
  };

  const handleTrickleVents = (option: string, cost: number) => {
    setTrickleVents(option);
    setTrickleVentsCost(cost);
  };

  const handleDelivery = (option: string, cost: number) => {
    setDelivery(option);
    setDeliveryCost(cost);
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

  const modal = useRef();

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

              <Field>
                <Label>Frame colour*</Label>
                <Field.Options>
                  <Option
                    isActive={frameColor === "White (RAL 9016 Gloss)"}
                    onClick={() =>
                      handleFrameColor("White (RAL 9016 Gloss)", 0)
                    }
                  >
                    White
                    <br />
                    (RAL 9016 Gloss)
                  </Option>
                  <Option
                    isActive={frameColor === "Black (RAL 9005 Matt)"}
                    onClick={() => handleFrameColor("Black (RAL 9005 Matt)", 0)}
                  >
                    Black
                    <br />
                    (RAL 9005 Matt)
                  </Option>
                  <Option
                    isActive={frameColor === "Anthracite (RAL 7016 Matt)"}
                    onClick={() =>
                      handleFrameColor("Anthracite (RAL 7016 Matt)", 0)
                    }
                  >
                    Anthracite
                    <br />
                    (RAL 7016 Matt)
                  </Option>
                  <Option
                    isActive={
                      frameColor ===
                      "Anthracite external (RAL 7016 Matt) / White internal (RAL 9016 Gloss)"
                    }
                    onClick={() =>
                      handleFrameColor(
                        "Anthracite external (RAL 7016 Matt) / White internal (RAL 9016 Gloss)",
                        0
                      )
                    }
                  >
                    Anthracite external (RAL 7016 Matt) / White internal (RAL
                    9016 Gloss)
                  </Option>
                  <Option
                    isActive={
                      frameColor ===
                      "Black external (RAL 9005 Matt) / White internal (RAL 9016 Gloss)"
                    }
                    onClick={() =>
                      handleFrameColor(
                        "Black external (RAL 9005 Matt) / White internal (RAL 9016 Gloss)",
                        0
                      )
                    }
                  >
                    Black external (RAL 9005 Matt) / White internal (RAL 9016
                    Gloss)
                  </Option>
                  <Option
                    isActive={frameColor === "Single RAL Internal & External"}
                    onClick={() =>
                      handleFrameColor("Single RAL Internal & External", 17500)
                    }
                  >
                    Single RAL Internal & External
                  </Option>
                  <Option
                    isActive={frameColor === "Dual RAL Internal & External"}
                    onClick={() =>
                      handleFrameColor("Dual RAL Internal & External", 22500)
                    }
                  >
                    Dual RAL Internal & External
                  </Option>
                </Field.Options>
              </Field>
              <Field help="Included in the overall size of the bifold">
                <Label>Add-on size*</Label>
                <Field.Options>
                  <Option
                    isActive={addOnSize === "None"}
                    onClick={() => {
                      handleAddOnSize("None", 0);
                      setAddOnPositionTop(false);
                      setAddOnPositionRight(false);
                      setAddOnPositionLeft(false);
                    }}
                  >
                    None
                  </Option>
                  <Option
                    isActive={addOnSize === "20mm add-on"}
                    onClick={() => handleAddOnSize("20mm add-on", 1650)}
                  >
                    20mm add-on
                  </Option>
                  <Option
                    isActive={addOnSize === "38mm add-on"}
                    onClick={() => handleAddOnSize("38mm add-on", 1850)}
                  >
                    38mm add-on
                  </Option>
                </Field.Options>
              </Field>
              {addOnSize !== "None" && (
                <Field help="Select all that apply">
                  <Label>Add-on position*</Label>
                  <Field.Options>
                    <Option
                      isActive={addOnPositionTop}
                      onClick={() => setAddOnPositionTop(!addOnPositionTop)}
                    >
                      Top
                    </Option>
                    <Option
                      isActive={addOnPositionRight}
                      onClick={() => setAddOnPositionRight(!addOnPositionRight)}
                    >
                      Right
                    </Option>
                    <Option
                      isActive={addOnPositionLeft}
                      onClick={() => setAddOnPositionLeft(!addOnPositionLeft)}
                    >
                      Left
                    </Option>
                  </Field.Options>
                </Field>
              )}
              <Field>
                <Label>Handle colour*</Label>
                <Field.Options>
                  <Option
                    isActive={handleColor === "White"}
                    onClick={() => handleHandleColour("White", 0)}
                  >
                    White
                  </Option>
                  <Option
                    isActive={handleColor === "Black"}
                    onClick={() => handleHandleColour("Black", 0)}
                  >
                    Black
                  </Option>
                  <Option
                    isActive={handleColor === "Anthracite"}
                    onClick={() => handleHandleColour("Anthracite", 0)}
                  >
                    Anthracite
                  </Option>
                  <Option
                    isActive={handleColor === "Chrome"}
                    onClick={() => handleHandleColour("Chrome", 1000)}
                  >
                    Chrome
                  </Option>
                  <Option
                    isActive={handleColor === "Satin Brushed Aluminium"}
                    onClick={() =>
                      handleHandleColour("Satin Brushed Aluminium", 1000)
                    }
                  >
                    Satin Brushed Aluminium
                  </Option>
                  {(frameColor === "White (RAL 9016 Gloss)" ||
                    frameColor === "Black (RAL 9005 Matt)" ||
                    frameColor === "Anthracite (RAL 7016 Matt)") && (
                    <Option
                      isActive={handleColor === "Dual-Colour to match"}
                      onClick={() =>
                        handleHandleColour("Dual-Colour to match", 2000)
                      }
                    >
                      Dual-Colour to match
                    </Option>
                  )}
                </Field.Options>
              </Field>
              <Field>
                <Label>Internal shootbolt handle colour*</Label>
                <Field.Options>
                  <Option
                    isActive={
                      internalShootbolt === "Standard to match door colour"
                    }
                    onClick={() =>
                      handleInternalShootbolt(
                        "Standard to match door colour",
                        0
                      )
                    }
                  >
                    Standard to match door colour
                  </Option>
                  {handleColor !== "Black" && (
                    <Option
                      isActive={internalShootbolt === "Black"}
                      onClick={() => handleInternalShootbolt("Black", 0)}
                    >
                      Black
                    </Option>
                  )}

                  {(frameColor === "Single RAL Internal & External" ||
                    frameColor === "Dual RAL Internal & External") && (
                    <>
                      <Option
                        isActive={internalShootbolt === "Chrome"}
                        onClick={() => handleInternalShootbolt("Chrome", 1000)}
                      >
                        Chrome
                      </Option>
                      <Option
                        isActive={
                          internalShootbolt === "Satin Brushed Aluminium"
                        }
                        onClick={() =>
                          handleInternalShootbolt(
                            "Satin Brushed Aluminium",
                            1000
                          )
                        }
                      >
                        Satin Brushed Aluminium
                      </Option>
                    </>
                  )}
                </Field.Options>
              </Field>
              <Field help="28mm double glazing units">
                <Label>Glazing*</Label>
                <Field.Options>
                  <Option
                    isActive={glazing === "Unglazed"}
                    onClick={() => {
                      handleGlazing("Unglazed", 0);
                      handleBlinds("N/a", 0);
                    }}
                  >
                    Unglazed
                  </Option>
                  <Option
                    isActive={glazing === "Clear Low E 1.2 U-value"}
                    onClick={() =>
                      handleGlazing("Clear Low E 1.2 U-value", 4900)
                    }
                  >
                    Clear Low E 1.2 U-value
                  </Option>
                  <Option
                    isActive={glazing === "Clear Ultra Low E 1.1 U-value"}
                    onClick={() => {
                      handleGlazing("Clear Ultra Low E 1.1 U-value", 5600);
                      handleBlinds("N/a", 0);
                    }}
                  >
                    Clear Ultra Low E 1.1 U-value
                  </Option>
                  <Option
                    isActive={
                      glazing ===
                      "Clear Ultra Low E 1.1 U-value PAS-24 6.8mm Laminated 4mm Unit"
                    }
                    onClick={() => {
                      handleGlazing(
                        "Clear Ultra Low E 1.1 U-value PAS-24 6.8mm Laminated 4mm Unit",
                        8100
                      );
                      handleBlinds("N/a", 0);
                    }}
                  >
                    Clear Ultra Low E 1.1 U-value PAS-24 6.8mm Laminated 4mm
                    Unit
                  </Option>
                  <Option
                    isActive={glazing === "Other"}
                    onClick={() => {
                      handleGlazing("Other", 0);
                      handleBlinds("N/a", 0);
                    }}
                  >
                    Other (POA)
                  </Option>
                </Field.Options>
              </Field>
              <Field help="Max 2300mm high and Max 2sqm per panel. Only available with clear Low E glazing. Magnet handing assumed opposite lever handle unless otherwise stated in notes below, inside view looking out.">
                <Label>Blinds*</Label>
                <Field.Options>
                  <Option
                    isActive={blinds === "N/a"}
                    onClick={() => {
                      handleBlinds("N/a", 0);
                      setBlindsColor("");
                      setBlindsTrack("");
                    }}
                  >
                    N/a
                  </Option>
                  {glazing === "Clear Low E 1.2 U-value" && (
                    <Option
                      isActive={blinds === "Integrated Blinds 1.2 U-value"}
                      onClick={() => {
                        handleBlinds("Integrated Blinds 1.2 U-value", 20000);
                        setBlindsColor("S102 White");
                        setBlindsTrack("S102 White");
                      }}
                    >
                      Integrated Blinds 1.2 U-value
                    </Option>
                  )}
                </Field.Options>
              </Field>
              {blinds === "Integrated Blinds 1.2 U-value" && (
                <>
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
                  <Field help="Best complimentary track colour is preselected when choosing the blinds colour. You can override this.">
                    <Label>Track colour*</Label>
                    <Field.Options>
                      <Option
                        isActive={blindsTrack === "S102 White"}
                        onClick={() => setBlindsTrack("S102 White")}
                      >
                        S102 White
                      </Option>

                      <Option
                        isActive={blindsTrack === "S149 Cream"}
                        onClick={() => setBlindsTrack("S149 Cream")}
                        style={{ background: "#f9f0e5" }}
                      >
                        S149 Cream
                      </Option>

                      <Option
                        isActive={blindsTrack === "S157 Silver"}
                        onClick={() => setBlindsTrack("S157 Silver")}
                        style={{ background: "#e0e0e0" }}
                      >
                        S157 Silver
                      </Option>
                      <Option
                        isActive={blindsTrack === "S159 Anthracite"}
                        onClick={() => setBlindsTrack("S159 Anthracite")}
                        style={{ background: "#676767", color: "#FFF" }}
                      >
                        S159 Anthracite
                      </Option>
                      <Option
                        isActive={blindsTrack === "S160 Black"}
                        onClick={() => setBlindsTrack("S160 Black")}
                        style={{ background: "#0a0a0a", color: "#FFF" }}
                      >
                        S160 Black
                      </Option>
                    </Field.Options>
                  </Field>
                </>
              )}
              <Field help="Each trickle vent provides up to 2500mm² of exhaust air">
                <Label>Trickle vents*</Label>
                <Field.Options>
                  <Option
                    isActive={trickleVents === "N/a"}
                    onClick={() => handleTrickleVents("N/a", 0)}
                  >
                    N/a
                  </Option>
                  <Option
                    isActive={trickleVents === "1"}
                    onClick={() => handleTrickleVents("1", 3750)}
                  >
                    1
                  </Option>
                  <Option
                    isActive={trickleVents === "2"}
                    onClick={() => handleTrickleVents("2", 7500)}
                  >
                    2
                  </Option>
                  <Option
                    isActive={trickleVents === "3"}
                    onClick={() => handleTrickleVents("3", 11250)}
                  >
                    3
                  </Option>
                </Field.Options>
              </Field>
              <Field help="Assembled delivery is only available for bifolds up to 4800mm wide x 2200mm high. Please ensure someone is available at the delivery address to assist with offloading and fitting location is accessible for size ordered. Redelivery charges may apply.">
                <Label>Delivery type*</Label>
                <Field.Options>
                  {frameWidth <= 4800 && frameHeight <= 2200 && (
                    <Option
                      isActive={delivery === "Assembled"}
                      onClick={() => handleDelivery("Assembled", 0)}
                    >
                      Assembled
                    </Option>
                  )}

                  <Option
                    isActive={delivery === "Kit form"}
                    onClick={() => handleDelivery("Kit form", 7500)}
                  >
                    Kit form
                  </Option>
                </Field.Options>
              </Field>
              <Field>
                <Label>Notes</Label>
                <Input
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  isTextArea={true}
                />
              </Field>
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
