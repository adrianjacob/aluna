// pages/p/[id].tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Layout from "../../components/Layout";
import Panel from "../../components/Panel";
import Reference from "../../config/Reference";
import Name from "../../config/Name";
import ContactNumber from "../../config/ContactNumber";
import Email from "../../config/Email";
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

  // Convert the total property of the post to a string
  const postWithTotalAsString = {
    ...post,
    total: post.total.toString(),
  };

  return {
    props: postWithTotalAsString,
  };
};

const Post: React.FC<PostProps> = (props) => {
  const [reference, setReference] = useState(props.reference);
  const [name, setName] = useState(props.name);
  const [contact, setContact] = useState(props.contact);
  const [email, setEmail] = useState(props.email);

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
      body: JSON.stringify({ reference, name, contact, email }),
    });
    await Router.push("/");
  }

  return (
    <Layout title="Edit quote">
      <Panel isPadding>
        <Reference {...{ reference, setReference }} />
        <Name {...{ name, setName }} />
        <ContactNumber {...{ contact, setContact }} />
        <Email {...{ email, setEmail }} />

        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => savePost(props.id)}>Save</button>
        )}
      </Panel>
      <style jsx>{``}</style>
    </Layout>
  );
};

export default Post;
