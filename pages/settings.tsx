import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Banner from "../components/Banner";
import Button from "../components/Button";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
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
