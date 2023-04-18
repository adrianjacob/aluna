import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Panel: React.FC<Props> = ({ children }) => (
  <>
    <main className="panel">{children}</main>
    <style jsx>{`
      .panel {
        background: white;
        min-height: calc(100vh - 150px);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        position: relative;
      }
    `}</style>
  </>
);

export default Panel;
