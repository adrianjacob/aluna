import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import Banner from "../components/Banner";
import Button from "../components/Button";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// quotes.tsx
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.quote.findMany({
    // where: { published: true },
    orderBy: {
      dateModified: "desc",
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") return <p>Loading...</p>;
  console.log(session);
  // if (!session) {
  //   router.push("/login");
  //   return null;
  // }
  return (
    <Layout
      title={
        session
          ? `Welcome back, ${session?.user?.name}`
          : `Aluna Doors & Windows`
      }
    >
      <Panel>
        {!session ? (
          <p>Please log in to view posts</p>
        ) : (
          <>
            {props.feed.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
            <Banner>
              <Banner.Right>
                <Link href="/create">
                  <Button>New quote 2</Button>
                </Link>
              </Banner.Right>
            </Banner>
          </>
        )}
      </Panel>

      <style jsx>{`
         
          .post {
            padding: 20px;
            border-bottom:1px solid #D1D1D1;
          }

         

        }
      `}</style>
    </Layout>
  );
};

export default Blog;
