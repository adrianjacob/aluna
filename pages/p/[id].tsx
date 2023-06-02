// pages/p/[id].tsx

import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import Panel from "../../components/Panel";
import Preview from "../../components/Preview";
import Line from "../../components/Line";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

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

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

async function editPost(id: string): Promise<void> {
  Router.push(`/edit/${id}`);
}

const Post: React.FC<PostProps> = (props) => {
  console.log(props.leftDoors);
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.reference;
  // if (!props.published) {
  //   title = `${title} (Draft)`;
  // }

  return (
    <Layout title={title}>
      <Panel isPadding>
        {/* <p>By {props?.author?.name || "Unknown author"}</p> */}
        <Preview
          leftDoors={props.leftDoors}
          rightDoors={props.rightDoors}
          frameColor={props.frameColor}
        />
        <div>
          <Line>
            <Line.Key>Type</Line.Key>
            <Line.Value>
              <Badge isOrdered={props.published} />
            </Line.Value>
          </Line>
          {Object.entries(props).map(([key, value]) => {
            if (
              typeof value === "object" ||
              key === "id" ||
              key === "authorId"
            ) {
              return null;
            }
            if (value) {
              return (
                <Line key={key}>
                  <Line.Key>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/[A-Z]/g, " $&")}
                  </Line.Key>
                  <Line.Value>
                    {key.includes("date") && typeof value === "string"
                      ? new Date(value).toLocaleString("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : key === "total"
                      ? "£" + value
                      : value}
                  </Line.Value>
                </Line>
              );
            }
            return null;
          })}
        </div>

        <Banner>
          <Banner.Left>
            {/* NEED TO DELETE WHEN LIVE - LEAVING IN SO EASILY MANAGE LIST */}
            {/* {userHasValidSession && ( */}
            {!props.published && userHasValidSession && postBelongsToUser && (
              <Button
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this quote? This action cannot be reverted"
                  );
                  if (confirmed) {
                    deletePost(props.id);
                  }
                }}
                variant="secondary"
              >
                Delete
              </Button>
            )}
          </Banner.Left>
          <Banner.Right>
            {!props.published && userHasValidSession && postBelongsToUser && (
              <Button onClick={() => editPost(props.id)} variant="secondary">
                Edit
              </Button>
            )}
            {!props.published && userHasValidSession && postBelongsToUser && (
              <Button
                onClick={() => {
                  const confirmed = window.confirm(
                    "By clicking 'OK', you’ve checked all the details and are happy to place the order, which will be sent to the office for manufacture. The office will send email confirmation once this is processed."
                  );
                  if (confirmed) {
                    publishPost(props.id);
                  }
                }}
              >
                Publish
              </Button>
            )}
            {props.published && userHasValidSession && (
              <div>
                <small>To edit or cancel order</small>
                <br />
                <a href="tel:01924929600">01924929600</a>
              </div>
            )}
          </Banner.Right>
        </Banner>
      </Panel>
      <style jsx>{``}</style>
    </Layout>
  );
};

export default Post;
