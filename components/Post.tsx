import React from "react";
import Router from "next/router";
import Badge from "./Badge";
import classNames from "classnames/bind";
import styles from "./Post.module.scss";

const cx = classNames.bind(styles);

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
    image: string;
  } | null;
  content: string;
  published: boolean;
  datePublished: string;
  dateModified: string;
  total: string;
  leftDoors: number;
  rightDoors: number;
  frameColor: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  console.log(post);
  return (
    <div
      className={cx("post")}
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <div className={cx("left")}>
        <div className={cx("circle")}>
          {post.author.image && (
            <img
              src={post.author.image}
              width="36"
              height="36"
              alt={post.author.name}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).style.display = "none"; // hide the image if there's an error
              }}
            />
          )}
        </div>
        <div>
          <div className={cx("ref")}>{post.reference}</div>
          <div className={cx("cost")}>
            {new Date(post.dateModified).toLocaleString("en-GB", {
              // weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            - £{post.total}
          </div>
        </div>
      </div>
      <div className={cx("right")}>
        <Badge isOrdered={post.published} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          className={cx("chevron")}
        >
          <path
            stroke="#131210"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m9 20 8-8-8-8"
          />
        </svg>
      </div>

      {/* <h2>{post.reference}</h2>
      <h3>Order = {post.published.toString()}</h3>
      <small>By {authorName}</small>
      <div>Frame width: {post.frameWidth}</div>
      <div>Frame height: {post.frameHeight}</div>
      <div>Threshold: {post.threshold}</div>
      <div>Cill: {post.cill}</div>
      <div>Published: {post.datePublished}</div>
      <div>Modified: {post.dateModified}</div> */}
    </div>
  );
};

export default Post;
