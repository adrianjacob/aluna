// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Router from "next/router";

const Draft: React.FC = () => {
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [frameWidth, setFrameWidth] = useState("2500");
  const [frameHeight, setFrameHeight] = useState("2200");
  const [threshold, setThreshold] = useState("Standard");
  const [cill, setCill] = useState("Standard");
  const [content, setContent] = useState("");

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

  return (
    <Layout title="New quote">
      <Panel>
        <form onSubmit={submitData}>
          <div>
            <label>reference*</label>
            <input
              autoFocus
              onChange={(e) => setReference(e.target.value)}
              type="text"
              value={reference}
              className="uppercase full"
              required
            />
          </div>
          <div>
            <label>name*</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              className="full"
              required
            />
          </div>
          <div>
            <label>contact number*</label>
            <input
              onChange={(e) => setContact(e.target.value)}
              type="text"
              value={contact}
              className="full"
              required
            />
          </div>
          <div>
            <label>email*</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              className="full"
              required
            />
          </div>
          <div>
            <label>Overall Frame Width (MM)*</label>
            <div className="flex">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setFrameWidth((frameWidth) => +frameWidth - 5);
                }}
              >
                -
              </button>
              <input
                onChange={(e) => setFrameWidth(e.target.value)}
                type="number"
                step="5"
                value={frameWidth}
                pattern="[0-9]*"
                className="half"
                required
              />
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setFrameWidth((frameWidth) => +frameWidth + 5);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label>Overall Frame Height (MM)*</label>
            <div className="flex">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setFrameHeight((frameHeight) => +frameHeight - 5);
                }}
              >
                -
              </button>
              <input
                onChange={(e) => setFrameHeight(e.target.value)}
                type="number"
                step="5"
                value={frameHeight}
                className="half"
                required
              />
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setFrameHeight((frameHeight) => +frameHeight + 5);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label>Threshold*</label>
            <div className="flex">
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
            </div>
            <input type="hidden" value={threshold} required />
          </div>
          <div>
            <label>Cill*</label>
            <div className="flex">
              <button
                type="button"
                className={[
                  cill === "Standard" && "highlight",
                  "multiple",
                ].join(" ")}
                onClick={() => setCill("Standard")}
              >
                Standard (150mm)
              </button>

              <button
                type="button"
                className={[cill === "None" && "highlight", "multiple"].join(
                  " "
                )}
                onClick={() => setCill("None")}
              >
                None
              </button>
              <button
                type="button"
                className={[cill === "90mm" && "highlight", "multiple"].join(
                  " "
                )}
                onClick={() => setCill("90mm")}
              >
                90mm
              </button>
              <button
                type="button"
                className={[cill === "190mm" && "highlight", "multiple"].join(
                  " "
                )}
                onClick={() => setCill("190mm")}
              >
                190mm
              </button>
              <button
                type="button"
                className={[cill === "230mm" && "highlight", "multiple"].join(
                  " "
                )}
                onClick={() => setCill("230mm")}
              >
                230mm
              </button>
            </div>
            <input type="hidden" value={cill} required />
          </div>

          <div>
            <label>Notes</label>
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              value={content}
              className="full"
            />
          </div>
          <input
            disabled={!content || !reference}
            type="submit"
            value="Create"
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </Panel>
      <style jsx>{`
        form {
          padding: 20px;
        }
        label {
          text-transform: uppercase;
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
        }
        div {
          margin: 20px 0;
        }

        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        input[type="number"],
        input[type="email"],
        textarea {
          padding: 0.5rem;

          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          font: inherit;
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .uppercase {
          text-transform: uppercase;
        }
        .half {
          width: calc(50% - 74px);
        }
        .full {
          width: 100%;
        }
        .flex {
          display: flex;
          margin: 0;
        }
        .btn {
          width: 37px;
        }
        .highlight {
          border: 2px solid #0bb4aa;
        }
        .multiple {
          height: 37px;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
