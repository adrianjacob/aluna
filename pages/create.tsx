import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Input from "../components/Input";
import Field from "../components/Field";
import Label from "../components/Label";
import Option from "../components/Option";
import Button from "../components/Button";
import Banner from "../components/Banner";
import Preview from "../components/Preview";
import Router from "next/router";
import { useSession } from "next-auth/react";

const Draft: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
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
  const [addOnPosition, setAddOnPosition] = useState("Top");
  const [handleColor, setHandleColor] = useState("White");
  const [handleColorCost, setHandleColorCost] = useState(0);
  const [internalShootbolt, setInternalShootbolt] = useState(
    "Standard to match door colour"
  );
  const [internalShootboltCost, setInternalShootboltCost] = useState(0);
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
    try {
      const body = {
        reference,
        name,
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
        addOnPosition,
        handleColor,
        internalShootbolt,
        content,
      };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
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

  // SET TOTAL
  useEffect(() => {
    const sumCill = (frameWidth / 1000) * (cillCost / 100);
    const doorsPerLeaf = frameHeight < 2250 ? 395 : 425;
    const sumDoors = doorsPerLeaf * (leftDoors + rightDoors);
    const sumFrameColor = (frameColorCost / 100) * (leftDoors + rightDoors);
    const sumAddOnSize = (frameWidth / 1000) * (addOnSizeCost / 100);
    const sumHandleColour = handleColorCost / 100;
    const sumInternalShootbolt = internalShootboltCost / 100;
    setTotal(
      sumCill +
        sumDoors +
        sumFrameColor +
        sumAddOnSize +
        sumHandleColour +
        sumInternalShootbolt
    );
  });

  // SET DEFAULT LEFT DOORS
  useEffect(() => {
    setLeftDoors(Math.floor(frameWidth / leaf.max));
  }, [frameWidth]);

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
                      frameWidthRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="decrement"
                    variant="tertiary"
                  >
                    -
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
                      frameWidthRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="increment"
                    variant="tertiary"
                  >
                    +
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
                      frameHeightRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="decrement"
                    variant="tertiary"
                  >
                    -
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
                      frameHeightRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="increment"
                    variant="tertiary"
                  >
                    +
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
                help={`Viewed from outside. Total min = ${Math.floor(
                  frameWidth / leaf.max
                )} and max = ${Math.floor(frameWidth / leaf.min)}. `}
              >
                <Label>Number of left hand doors*</Label>
                <Field.Flex>
                  <Button
                    type="button"
                    onClick={() => {
                      setLeftDoors((leftDoors) => Math.max(+leftDoors - 1, 0)); // ensure the resulting value is not less than 0

                      leftDoorsRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="decrement"
                    variant="tertiary"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    step="1"
                    value={leftDoors}
                    required
                    ref={leftDoorsRef}
                    min={Math.max(
                      Math.floor(frameWidth / leaf.max) - +rightDoors,
                      0
                    )}
                    max={Math.max(
                      Math.floor(frameWidth / leaf.min) - +rightDoors,
                      0
                    )}
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        `Please enter a total doors value between ${Math.floor(
                          frameWidth / leaf.max
                        )} and ${Math.floor(
                          frameWidth / leaf.min
                        )}. Current total = ${+leftDoors + +rightDoors}`
                      )
                    }
                    onChange={(e) => {
                      e.target.setCustomValidity("");
                      setLeftDoors(e.target.value);
                    }}
                    className="square"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setLeftDoors((leftDoors) => +leftDoors + 1);
                      leftDoorsRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="increment"
                    variant="tertiary"
                  >
                    +
                  </Button>
                </Field.Flex>
              </Field>
              <Field
                help={`Viewed from outside. Total min = ${Math.floor(
                  frameWidth / leaf.max
                )} and max = ${Math.floor(frameWidth / leaf.min)}. `}
              >
                <Label>Number of right hand doors*</Label>
                <Field.Flex>
                  <Button
                    type="button"
                    onClick={() => {
                      setRightDoors((rightDoors) =>
                        Math.max(+rightDoors - 1, 0)
                      );

                      leftDoorsRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="decrement"
                    variant="tertiary"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    step="1"
                    value={rightDoors}
                    required
                    ref={rightDoorsRef}
                    min={Math.max(
                      Math.floor(frameWidth / leaf.max) - +leftDoors,
                      0
                    )}
                    max={Math.max(
                      Math.floor(frameWidth / leaf.min) - +leftDoors,
                      0
                    )}
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        `Please enter a total doors value between ${Math.floor(
                          frameWidth / leaf.max
                        )} and ${Math.floor(
                          frameWidth / leaf.min
                        )}. Current total = ${+leftDoors + +rightDoors}`
                      )
                    }
                    onChange={(e) => {
                      e.target.setCustomValidity("");
                      setRightDoors(e.target.value);
                    }}
                    className="square"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setRightDoors((rightDoors) => +rightDoors + 1);
                      rightDoorsRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="increment"
                    variant="tertiary"
                  >
                    +
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
                    onClick={() => setOpeningDirection("In")}
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
                      "White internal (RAL 9016 Gloss) / Anthracite external (RAL 7016 Matt)"
                    }
                    onClick={() =>
                      handleFrameColor(
                        "White internal (RAL 9016 Gloss) / Anthracite external (RAL 7016 Matt)",
                        0
                      )
                    }
                  >
                    White internal
                    <br />
                    (RAL 9016 Gloss) / Anthracite external (RAL 7016 Matt)
                  </Option>
                  <Option
                    isActive={
                      frameColor ===
                      "White internal (RAL 9016 Gloss) / Black external (RAL 9005 Matt)"
                    }
                    onClick={() =>
                      handleFrameColor(
                        "White internal (RAL 9016 Gloss) / Black external (RAL 9005 Matt)",
                        0
                      )
                    }
                  >
                    White internal
                    <br />
                    (RAL 9016 Gloss) / Black external (RAL 9005 Matt)
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
                    onClick={() => handleAddOnSize("None", 0)}
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

              <Field help="Select all that apply">
                <Label>Add-on position* [HAVE QUERIES]</Label>
                <Field.Options>
                  <Option
                    isActive={addOnPosition === "Top"}
                    onClick={() => setAddOnPosition("Top")}
                  >
                    Top
                  </Option>
                  <Option
                    isActive={addOnPosition === "Right"}
                    onClick={() => setAddOnPosition("Right")}
                  >
                    Right
                  </Option>
                  <Option
                    isActive={addOnPosition === "Left"}
                    onClick={() => setAddOnPosition("Left")}
                  >
                    Left
                  </Option>
                </Field.Options>
              </Field>

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
                  <Link href="/">
                    <Button variant="secondary">Cancel</Button>
                  </Link>
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
                  <Button type="submit">Submit</Button>
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
