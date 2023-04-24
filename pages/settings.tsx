import React from "react";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Settings: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }
  return (
    <Layout title="Settings">
      <Panel>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </Panel>
    </Layout>
  );
};

export default Settings;
