import { signIn, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Button from "../components/Button";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // If session is loading, show a loading indicator
    return <p>Loading...</p>;
  }

  return (
    <Layout title="Welcome to Aluna">
      <Panel isPadding>
        <div className="asset">
          <Image src="/preview.jpeg" alt="Welcome" width="1000" height="455" />
        </div>
        <div className="logins">
          <button onClick={() => signIn("google")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                fill="#FFC107"
                d="M21.805 10.041H21V10h-9v4h5.651A5.998 5.998 0 0 1 6 12a6 6 0 0 1 6-6c1.53 0 2.921.577 3.98 1.52L18.81 4.69A9.954 9.954 0 0 0 12 2C6.478 2 2 6.478 2 12c0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-.67-.069-1.325-.195-1.959Z"
              />
              <path
                fill="#FF3D00"
                d="m3.153 7.346 3.286 2.409A5.997 5.997 0 0 1 12 6c1.53 0 2.921.577 3.98 1.52L18.81 4.69A9.954 9.954 0 0 0 12 2a9.994 9.994 0 0 0-8.847 5.346Z"
              />
              <path
                fill="#4CAF50"
                d="M12 22c2.583 0 4.93-.988 6.704-2.596l-3.095-2.619A5.955 5.955 0 0 1 12 18a5.997 5.997 0 0 1-5.641-3.973L3.098 16.54C4.753 19.777 8.114 22 12 22Z"
              />
              <path
                fill="#1976D2"
                d="M21.805 10.041H21V10h-9v4h5.651a6.02 6.02 0 0 1-2.043 2.785h.002l3.095 2.619C18.485 19.602 22 17 22 12c0-.67-.069-1.325-.195-1.959Z"
              />
            </svg>
            Sign in with Google
          </button>
          <button onClick={() => signIn("github")}>Sign in with GitHub</button>
        </div>
        <style jsx>{`
          div.asset {
            border-radius: 5px;
            overflow: hidden;
            display: flex;
            margin-bottom: 20px;
          }
          div.logins {
            display: grid;
            gap: 20px;
            max-width: 375px;
            margin: 0 auto;
          }
          button {
            background: #ededed;
            border: 0;
            height: 40px;
            border-radius: 5px;
            font: inherit;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          svg {
            position: absolute;
            left: 10px;
          }
          button:hover {
            background: #e5e5e5;
          }
        `}</style>
      </Panel>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    // If session exists, redirect to home page
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
