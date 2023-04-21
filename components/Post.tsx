import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  reference: string;
  name: string;
  contact: string;
  email: string;
  frameWidth: string;
  frameHeight: string;
  threshold: string;
  cill: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  datePublished: string;
  dateModified: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.reference}</h2>
      <h3>Order = {post.published.toString()}</h3>
      <small>By {authorName}</small>
      <div>Frame width: {post.frameWidth}</div>
      <div>Frame height: {post.frameHeight}</div>
      <div>Threshold: {post.threshold}</div>
      <div>Cill: {post.cill}</div>
      <div>Published: {post.datePublished}</div>
      <div>Modified: {post.dateModified}</div>
      {/* <ReactMarkdown children={post.content} /> */}
      <style jsx>{`
        div {
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default Post;
