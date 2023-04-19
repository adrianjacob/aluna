import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
  title: String;
};

const Layout: React.FC<Props> = ({ title, children }) => (
  <div>
    <Header title={title} />
    <div className="layout">{children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
        padding-top: 150px;
        overscroll-behavior: none;
        overflow: scroll;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
        margin: 0;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: #0bb4aa;
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
  </div>
);

export default Layout;
