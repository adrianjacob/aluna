// Header.tsx
import React from "react";
import Link from "next/link";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header: React.FC = ({ title }) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  return (
    <header className={cx("header")}>
      <nav className={cx("nav")}>
        {session && (
          <>
            <div className={cx("left")}>
              <Link href="/">
                <a className={cx("home")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      stroke="#FFF"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="m4 10 8-7 8 7v10h-5v-4a3 3 0 0 0-6 0v4H4V10Z"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className={cx("right")}>
              <Link href="/settings">
                <a>
                  <img
                    src={session.user.image}
                    width="36"
                    height="36"
                    className={cx("profile")}
                  />
                </a>
              </Link>
              {/* <p>{session.user.name}</p> */}
            </div>
          </>
        )}
      </nav>
      <h1 className={cx("h1")}>{title}</h1>
    </header>
  );
};

export default Header;
