// @ts-nocheck

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
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

  const handleCillSelect = (option: string, cost: number) => {
    setCill(option);
    setCillCost(cost);
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
      <Panel>
        {!session ? (
          <p>Please log in to view posts</p>
        ) : (
          <>
            <form onSubmit={submitData}>
              <Field>
                <Label>reference*</Label>
                <Input
                  autoFocus
                  onChange={(e) => setReference(e.target.value)}
                  type="text"
                  value={reference}
                  required
                  className="uppercase"
                />
              </Field>
              <Field>
                <Label>name*</Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  required
                />
              </Field>
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
              {deliveryOption === "Custom" && (
                <>
                  <Field>
                    <Label>Address line 1*</Label>
                    <Input
                      onChange={(e) => setAddress1(e.target.value)}
                      type="text"
                      value={address1}
                      required
                    />
                  </Field>
                  <Field>
                    <Label>Address line 2</Label>
                    <Input
                      onChange={(e) => setAddress2(e.target.value)}
                      type="text"
                      value={address2}
                    />
                  </Field>
                  <Field>
                    <Label>Town*</Label>
                    <Input
                      onChange={(e) => setTown(e.target.value)}
                      type="text"
                      value={town}
                      required
                    />
                  </Field>
                  <Field>
                    <Label>County*</Label>
                    <Input
                      onChange={(e) => setCounty(e.target.value)}
                      type="text"
                      value={county}
                      required
                    />
                  </Field>
                  <Field>
                    <Label>Postcode*</Label>
                    <Input
                      onChange={(e) => setPostcode(e.target.value)}
                      type="text"
                      value={postcode}
                      pattern="^[A-z]{1,2}[0-9]{1,2}[A-z]{0,1}\s{0,1}[0-9]{1}[A-z]{2}$"
                      required
                      className="small"
                    />
                  </Field>
                </>
              )}
              <Field>
                <Label>contact number*</Label>
                <Input
                  onChange={(e) => setContact(e.target.value)}
                  type="number"
                  value={contact}
                  required
                />
              </Field>
              <Field>
                <Label>email*</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  required
                />
              </Field>
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
                    onChange={(e) => setFrameWidth(e.target.value)}
                    type="number"
                    step="5"
                    value={frameWidth}
                    pattern="[0-9]*"
                    required
                    ref={frameWidthRef}
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
                </Field.Flex>
              </Field>
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M1 1h10"
                      />
                    </svg>
                  </Button>
                  <Input
                    onChange={(e) => setFrameHeight(e.target.value)}
                    type="number"
                    step="5"
                    value={frameHeight}
                    pattern="[0-9]*"
                    required
                    ref={frameHeightRef}
                    className="square"
                    min="0"
                    max="2500"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setFrameHeight((frameHeight) =>
                        Math.min(+frameHeight + 5, 2500)
                      );
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M1 9h16M9 1v16"
                      />
                    </svg>
                  </Button>
                </Field.Flex>
              </Field>
              <Field>
                <Label>Threshold*</Label>
                <Field.Options>
                  <Option
                    isActive={threshold === "Standard (55mm)"}
                    onClick={() => setThreshold("Standard (55mm)")}
                  >
                    Standard
                    <br />
                    (55mm)
                  </Option>
                  <Option
                    isActive={threshold === "Low (20mm)"}
                    onClick={() => setThreshold("Low (20mm)")}
                  >
                    Low
                    <br />
                    (20mm)
                  </Option>
                  <Option
                    isActive={threshold === "Low w/rebate (40mm)"}
                    onClick={() => setThreshold("Low w/rebate (40mm)")}
                  >
                    Low w/rebate
                    <br />
                    (40mm)
                  </Option>
                </Field.Options>
              </Field>
              <Field>
                <Label>Cill*</Label>
                <Field.Options>
                  <Option
                    isActive={cill === "Standard (150mm)"}
                    onClick={() => handleCillSelect("Standard (150mm)", 1800)}
                  >
                    Standard
                    <br />
                    (150mm)
                  </Option>
                  <Option
                    isActive={cill === "None"}
                    onClick={() => handleCillSelect("None", 0)}
                  >
                    None
                  </Option>
                  <Option
                    isActive={cill === "90mm"}
                    onClick={() => handleCillSelect("90mm", 1650)}
                  >
                    90mm
                  </Option>
                  <Option
                    isActive={cill === "190mm"}
                    onClick={() => handleCillSelect("190mm", 2100)}
                  >
                    190mm
                  </Option>
                  <Option
                    isActive={cill === "230mm"}
                    onClick={() => handleCillSelect("230mm", 2500)}
                  >
                    230mm
                  </Option>
                </Field.Options>
              </Field>
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
                      if (
                        leftDoors + rightDoors <=
                        Math.ceil(frameWidth / leaf.max)
                      ) {
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
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
                    ref={leftDoorsRef}
                    onChange={(e) => {
                      setLeftDoors(e.target.value);
                    }}
                    className="square"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (
                        leftDoors + rightDoors >=
                          Math.floor(frameWidth / leaf.min) &&
                        rightDoors !== 0
                      ) {
                        setRightDoors((rightDoors) => {
                          return +rightDoors - 1;
                        });
                        setLeftDoors((leftDoors) => {
                          return +leftDoors + 1;
                        });
                      } else if (
                        leftDoors < Math.floor(frameWidth / leaf.min)
                      ) {
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M1 9h16M9 1v16"
                      />
                    </svg>
                  </Button>
                </Field.Flex>
              </Field>
              <Field
                help={`Viewed from outside. Total doors min = ${Math.ceil(
                  frameWidth / leaf.max
                )} and max = ${Math.floor(frameWidth / leaf.min)}. `}
              >
                <Label>Number of right hand doors*</Label>
                <Field.Flex>
                  <Button
                    type="button"
                    onClick={() => {
                      if (
                        leftDoors + rightDoors <=
                        Math.ceil(frameWidth / leaf.max)
                      ) {
                        return false;
                      } else if (rightDoors !== 0) {
                        setRightDoors((rightDoors) => {
                          return +rightDoors - 1;
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M1 1h10"
                      />
                    </svg>
                  </Button>
                  <Input
                    type="number"
                    readOnly
                    step="1"
                    value={rightDoors}
                    required
                    ref={rightDoorsRef}
                    onChange={(e) => {
                      setRightDoors(e.target.value);
                    }}
                    className="square"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (
                        leftDoors + rightDoors >=
                          Math.floor(frameWidth / leaf.min) &&
                        leftDoors !== 0
                      ) {
                        setLeftDoors((leftDoors) => {
                          return +leftDoors - 1;
                        });
                        setRightDoors((rightDoors) => {
                          return +rightDoors + 1;
                        });
                      } else if (
                        rightDoors < Math.floor(frameWidth / leaf.min)
                      ) {
                        setRightDoors((rightDoors) => {
                          return +rightDoors + 1;
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M1 9h16M9 1v16"
                      />
                    </svg>
                  </Button>
                </Field.Flex>
              </Field>

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

              <Field help="Viewed from outside">
                <Label>Master / traffic door side*</Label>
                <Field.Options>
                  <Option
                    isActive={trafficDoorSide === "Left"}
                    onClick={() => setTrafficDoorSIde("Left")}
                  >
                    Left
                  </Option>
                  <Option
                    isActive={trafficDoorSide === "Right"}
                    onClick={() => setTrafficDoorSIde("Right")}
                  >
                    Right
                  </Option>
                  <Option
                    isActive={trafficDoorSide === "N/A"}
                    onClick={() => setTrafficDoorSIde("N/A")}
                  >
                    N/A
                  </Option>
                </Field.Options>
              </Field>

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
                  <Option
                    isActive={internalShootbolt === "Black"}
                    onClick={() => handleInternalShootbolt("Black", 0)}
                  >
                    Black
                  </Option>
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
                    onClick={() => handleBlinds("N/a", 0)}
                  >
                    N/a
                  </Option>
                  {glazing === "Clear Low E 1.2 U-value" && (
                    <Option
                      isActive={blinds === "Integrated Blinds 1.2 U-value"}
                      onClick={() =>
                        handleBlinds("Integrated Blinds 1.2 U-value", 20000)
                      }
                    >
                      Integrated Blinds 1.2 U-value
                    </Option>
                  )}
                </Field.Options>
              </Field>

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
      <style jsx>{`
        form {
          padding: 20px;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
