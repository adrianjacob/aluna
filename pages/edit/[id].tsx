// pages/p/[id].tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import Panel from "../../components/Panel";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.quote.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

const Post: React.FC<PostProps> = (props) => {
  // const [title, setTitle] = useState(props.reference);
  const [reference, setReference] = useState(props.reference);

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  // let title = props.reference;
  // if (!props.published) {
  //   title = `${title}`;
  // }

  async function savePost(id: string): Promise<void> {
    await fetch(`/api/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    });
    await Router.push("/");
  }

  return (
    <Layout>
      <Panel>
        {/* <h2>{title}</h2> */}
        <input
          autoFocus
          onChange={(e) => setReference(e.target.value)}
          type="text"
          value={reference}
        />
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => savePost(props.id)}>Save</button>
        )}
      </Panel>
      <style jsx>{``}</style>
    </Layout>
  );
};

export default Post;
