// pages/create.tsx

import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Input from "../components/Input";
import Field from "../components/Field";
import Label from "../components/Label";
import Button from "../components/Button";
import Router from "next/router";
import { useSession } from "next-auth/react";

const Draft: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [frameWidth, setFrameWidth] = useState(2500);
  const [frameHeight, setFrameHeight] = useState(2200);
  const [threshold, setThreshold] = useState("Standard");
  const [cill, setCill] = useState("Standard");
  const [cillCost, setCillCost] = useState(1800);
  const [leftDoors, setLeftDoors] = useState(0);
  const [rightDoors, setRightDoors] = useState(0);
  const [content, setContent] = useState("");

  const frameWidthRef = useRef<HTMLInputElement>(null);
  const frameHeightRef = useRef<HTMLInputElement>(null);
  const leftDoorsRef = useRef<HTMLInputElement>(null);
  const rightDoorsRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  // SET TOTAL
  useEffect(() => {
    setTotal((frameWidth / 1000) * (cillCost / 100));
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
            <form onSubmit={submitData} ref={formRef}>
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
              <Field>
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
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setFrameWidth((frameWidth) => +frameWidth + 5);
                      frameWidthRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="increment"
                  >
                    +
                  </Button>
                </Field.Flex>
              </Field>
              <Field>
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
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setFrameHeight((frameHeight) => +frameHeight + 5);
                      frameHeightRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="increment"
                  >
                    +
                  </Button>
                </Field.Flex>
              </Field>
              <Field>
                <Label>Threshold*</Label>
                <Field.Flex>
                  <button
                    type="button"
                    className={[
                      threshold === "Standard" && "highlight",
                      "multiple",
                    ].join(" ")}
                    onClick={() => setThreshold("Standard")}
                  >
                    Standard (55mm)
                  </button>
                  <button
                    type="button"
                    className={[
                      threshold === "Low" && "highlight",
                      "multiple",
                    ].join(" ")}
                    onClick={() => setThreshold("Low")}
                  >
                    Low (20mm)
                  </button>
                  <button
                    type="button"
                    className={[
                      threshold === "Low w/rebate" && "highlight",
                      "multiple",
                    ].join(" ")}
                    onClick={() => setThreshold("Low w/rebate")}
                  >
                    Low w/rebate (40mm)
                  </button>
                </Field.Flex>
              </Field>
              <Field>
                <Label>Cill*</Label>
                <Field.Flex>
                  <button
                    type="button"
                    className={[
                      cill === "Standard" && "highlight",
                      "multiple",
                    ].join(" ")}
                    onClick={() => handleCillSelect("Standard", 1800)}
                  >
                    Standard (150mm)
                  </button>
                  <button
                    type="button"
                    className={[
                      cill === "None" && "highlight",
                      "multiple",
                    ].join(" ")}
                    onClick={() => handleCillSelect("None", 0)}
                  >
                    None
                  </button>
                  <button
                    type="button"
                    className={[
                      cill === "90mm" && "highlight",
                      "multiple",
                    ].join(" ")}
                    onClick={() => handleCillSelect("90mm", 1650)}
                  >
                    90mm
                  </button>
                  <button
                    type="button"
                    className={[
                      cill === "190mm" && "highlight",
                      "multiple",
                    ].join(" ")}
                    onClick={() => handleCillSelect("190mm", 2100)}
                  >
                    190mm
                  </button>
                  <button
                    type="button"
                    className={[
                      cill === "230mm" && "highlight",
                      "multiple",
                    ].join(" ")}
                    onClick={() => handleCillSelect("230mm", 2500)}
                  >
                    230mm
                  </button>
                </Field.Flex>
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
                        )} and ${Math.floor(frameWidth / leaf.min)}.`
                      )
                    }
                    onChange={(e) => {
                      e.target.setCustomValidity("");
                      setLeftDoors(e.target.value);
                    }}
                    className="square"
                    // isError={
                    //   +leftDoors + +rightDoors >
                    //     Math.floor(frameWidth / leaf.min) ||
                    //   +leftDoors + +rightDoors <
                    //     Math.floor(frameWidth / leaf.max)
                    // }
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setLeftDoors((leftDoors) => +leftDoors + 1);
                      leftDoorsRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="increment"
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
                        )} and ${Math.floor(frameWidth / leaf.min)}.`
                      )
                    }
                    onChange={(e) => {
                      e.target.setCustomValidity("");
                      setRightDoors(e.target.value);
                    }}
                    className="square"
                    // isError={
                    //   +leftDoors + +rightDoors >
                    //     Math.floor(frameWidth / leaf.min) ||
                    //   +leftDoors + +rightDoors <
                    //     Math.floor(frameWidth / leaf.max)
                    // }
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setRightDoors((rightDoors) => +rightDoors + 1);
                      rightDoorsRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="increment"
                  >
                    +
                  </Button>
                </Field.Flex>
              </Field>

              <Field>
                <Label>Notes</Label>
                <Input
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  isTextArea={true}
                />
              </Field>
            </form>
            <div className="bar">
              <button
                value="Create"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (formRef.current.checkValidity()) {
                    formRef.current.submit();
                  } else {
                    formRef.current.reportValidity();
                  }
                }}
              >
                Create
              </button>
              <a className="back" href="#" onClick={() => Router.push("/")}>
                or Cancel
              </a>
              <div>
                £
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                (ex. VAT@20%)
              </div>
            </div>
          </>
        )}
      </Panel>
      <style jsx>{`
        .bar {
          position: fixed;
          bottom: 0px;
          background: #ededed;
          width: 100%;
          padding: 20px;
          border-top: 1px solid white;
        }
        form {
          padding: 20px;
        }

        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .flex {
          display: flex;
          margin: 0;
        }

        .highlight {
          border: 2px solid #0bb4aa;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
